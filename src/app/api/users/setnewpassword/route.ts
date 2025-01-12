import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    user.forgetPasswordToken = undefined;
    user.forgetPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
