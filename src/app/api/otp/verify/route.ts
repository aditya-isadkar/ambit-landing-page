import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = body?.token;
    const otp = body?.otp?.trim();
    const mobile = body?.mobile?.trim();
    const context = body?.context ?? "public";

    if (!token || !otp) {
      return NextResponse.json(
        { message: "OTP token and value are required." },
        { status: 400 }
      );
    }

    // Retrieve OTP data from HTTP-only cookie
    // FIX: Added 'await' before cookies()
    const cookieStore = await cookies();
    
    const cookieName = `otp_${token}`;
    const otpCookie = cookieStore.get(cookieName);

    if (!otpCookie?.value) {
      console.error("OTP verification: Token not found", { token, context, mobile });
      return NextResponse.json({ message: "OTP has expired or is invalid. Please request a new OTP." }, { status: 410 });
    }

    let record;
    try {
      record = JSON.parse(otpCookie.value);
    } catch (parseError) {
      console.error("OTP verification: Invalid cookie data", { token });
      cookieStore.delete(cookieName);
      return NextResponse.json({ message: "OTP has expired or is invalid. Please request a new OTP." }, { status: 410 });
    }

    if (record.context !== context) {
      return NextResponse.json({ message: "OTP context mismatch." }, { status: 403 });
    }

    if (mobile && record.mobile !== mobile) {
      return NextResponse.json({ message: "Mobile number mismatch." }, { status: 403 });
    }

    if (Date.now() > record.expiresAt) {
      cookieStore.delete(cookieName);
      return NextResponse.json({ message: "OTP has expired. Please request a new OTP." }, { status: 410 });
    }

    const hashedValue = crypto.createHash("sha256").update(`${otp}:${token}`).digest("hex");
    if (hashedValue !== record.hashedOtp) {
      return NextResponse.json({ message: "Invalid OTP. Please check and try again." }, { status: 401 });
    }

    // Delete cookie after successful verification
    cookieStore.delete(cookieName);
    console.log("OTP verification: Success", { token, mobile, context });

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("OTP verification failed", error);
    return NextResponse.json({ message: "OTP verification failed." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";