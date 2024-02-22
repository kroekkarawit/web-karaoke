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
    const seekToMinute = 2; // Seek to 5 minutes into the video
    const startOffset = seekToMinute * 60; // Convert minutes to seconds

    const stream: any = ytdl(videoId, {
      format: format,
      begin: startOffset,
    });

    const newHeaders = new Headers(request.headers);
    // Add a new header
    newHeaders.set("Content-Type", "video/mp4");
    newHeaders.set("Transfer-Encoding", "chunked");
    newHeaders.set("Keep-Alive", "timeout=5");

    return new Response(stream, { status: 200, headers: newHeaders });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
