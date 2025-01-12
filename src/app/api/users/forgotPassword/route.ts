import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    user.forgetPasswordToken = await bcryptjs.hash(user._id.toString(), salt);
    user.forgetPasswordTokenExpiry = Date.now() + 3600000;
    await user.save();

    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      message: "Password reset link sent to your email",
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
