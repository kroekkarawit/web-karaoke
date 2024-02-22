import User from "@/models/user";
import Room from "@/models/room";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();

    var decoded: any = jwt.verify(
      req.accessToken,
      process.env.JWT_SECRET || ""
    );
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Authorization Failed" }), {
        status: 401,
      });
    }

    await connectToDB();
    const user = await User.findOne({ id: decoded._id, status: "ACTIVE" });
    if (!user) {
      return new Response(JSON.stringify({ error: "User Not found" }), {
        status: 403,
      });
    }
    const randomCode: string = [...Array(9)]
      .map(() => Math.random().toString(36)[2])
      .join("");
      
    const room = await Room.create({
      host: user._id,
      code: randomCode,
    });

    return new Response(JSON.stringify(room), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
