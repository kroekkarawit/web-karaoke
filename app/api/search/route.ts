import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { connectToDB } from "@/utils/database";
import Search from "@/models/search";
export const GET = async (
  request: NextRequest,
  { params }: { params: { query: any } }
) => {
  try {
    const searchQuery = request.nextUrl.searchParams.get("query") as string;

    const searchCache = await cacheSearch(searchQuery);
    if (searchCache) {
      return new Response(JSON.stringify(searchCache), { status: 200 });
    }

    const searchYoutubeApi = await youtubeApiSearch(searchQuery);
    if (searchYoutubeApi) {
      return new Response(JSON.stringify(searchYoutubeApi), { status: 200 });
    }

    return new Response(JSON.stringify([]), {
      status: 404,
    });
  } catch (error: any) {
    return new Response(JSON.stringify([]), {
      status: 500,
    });
  }
};

const youtubeApiSearch = async (searchQuery: string) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;  // Replace with your authorized API key
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  try {
    const response = await axios.get<{
      items: {
        id: { videoId: string };
        snippet: { title: string };
      }[];
    }>(
      `${BASE_URL}?part=snippet&q=${searchQuery}+คาราโอเกะ+karaoke&key=${API_KEY}&maxResults=12`
    );

    const videoData = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
    }));

    await connectToDB();
    await Search.create({
      query: `${searchQuery}+คาราโอเกะ+karaoke`,
      raw_query: searchQuery,
      data: videoData.filter((item) => item.id),
    });

    return videoData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const cacheSearch = async (searchQuery: string) => {
  //Save cost when call youtube api
  try {
    await connectToDB();

    const searchCache = await Search.findOne({ raw_query: searchQuery });
    if (searchCache.data) {
      return searchCache.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
