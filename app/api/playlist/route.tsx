import User from "@/models/user";
import Room from "@/models/room";
import Playlist from "@/models/playlist";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();
    const token: string | undefined = cookieStore.get("access_token")?.value;

    const req = await request.json();

    var decoded: any = jwt.verify(token || "", process.env.JWT_SECRET || "");
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Authorization Failed" }), {
        status: 401,
      });
    }
    const user = await User.findOne({});

    await connectToDB();
    const roomId = req.room_id;
    const userId = user._id;
    const youtubeId = req.youtube_id;
    const title = req.title;

    const room = await Room.findOne({ code: roomId, status: "ACTIVE" });
    if (!room) {
      return new Response(JSON.stringify({ error: "Room Not found" }), {
        status: 403,
      });
    }

    const playlist = await Playlist.create({
      room: room._id,
      user: userId,
      youtube_id: youtubeId,
      title: title,
      status: "PENDING",
    });

    const getRecentsPlaylists = await Playlist.find({
      room: room._id,
      status: "PENDING",
    });

    return new Response(JSON.stringify(getRecentsPlaylists), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();
    const token: string | undefined = cookieStore.get("access_token")?.value;

    const req = await request.json();

    var decoded: any = jwt.verify(token || "", process.env.JWT_SECRET || "");
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Authorization Failed" }), {
        status: 401,
      });
    }
    const user = await User.findOne({});

    await connectToDB();
    const roomId = req.room_id;
    const youtubeId = req.youtube_id || "";
    const playlistId = req.playlist_id || null;

    const room = await Room.findOne({ code: roomId, status: "ACTIVE" });
    if (!room) {
      return new Response(JSON.stringify({ error: "Room Not found" }), {
        status: 403,
      });
    }

    const playlist = await Playlist.updateOne(
      {
        room: room._id,
        $or: [{ youtube_id: youtubeId }, { _id: playlistId }],
      },
      { $set: { status: "INACTIVE" } }
    );

    return new Response(JSON.stringify(playlist), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
