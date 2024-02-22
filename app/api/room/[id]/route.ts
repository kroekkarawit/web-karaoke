import { NextRequest, NextResponse } from "next/server";
 import Room from "@/models/room";
import { connectToDB } from "@/utils/database";
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
    return new Response(JSON.stringify(room), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
