import User from "@/models/user";
import Room from "@/models/room";
import Playlist from "@/models/playlist";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  try {
    const roomId: string = params.id;
    await connectToDB();
    const room = await Room.findOne({ code: roomId, status: "ACTIVE" });
    if (!room) {
      return new Response(JSON.stringify({ error: "Room Not found" }), {
        status: 403,
      });
    }
    const playlists = await Playlist.find({
      room: room._id,
      status: { $in: ["ACTIVE", "PENDING"] },
    });

    return new Response(JSON.stringify(playlists), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
