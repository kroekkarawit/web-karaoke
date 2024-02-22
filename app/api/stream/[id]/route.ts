import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const url = request.url;
    const videoId: string = url.split("/").pop() || "";

    const videoInfo = await ytdl.getInfo(videoId);
    const format = ytdl.chooseFormat(videoInfo.formats, {
      quality: "highestvideo",
    });

    if (!format) {
      throw new Error("No video format found");
    }

    const stream: any = ytdl(videoId, { format: format });
    return new Response(stream, { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
