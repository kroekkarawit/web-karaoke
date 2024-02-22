import User from "@/models/user";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    //const req = await request.json();

    await connectToDB();

    const user = await User.create({});
    if (!user) {
      return new Response(JSON.stringify({ error: "User Not found" }), {
        status: 403,
      });
    }
    const token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET || "", {
      expiresIn: "24h",
    });

    return new Response(JSON.stringify(token), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
