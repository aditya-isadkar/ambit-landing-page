import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const OTP_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutes
const OTP_RESEND_INTERVAL_MS = 60 * 1000; // 60 seconds

// Cast globalThis to any to avoid type errors
const globalAny = globalThis as any;

if (!globalAny.__ambitOtpRateLimiter) {
globalAny.__ambitOtpRateLimiter = new Map();
}

async function dispatchSms({ mobile, otp, context }: { mobile: string; otp: string; context: string }) {
const smsGatewayUrl = "https://http.myvfirst.com/smpp/sendsms";
const smsGatewayUsername = "volitnltdhttp";
const smsGatewayPassword = "tion8922";
const smsSenderId = "AMBITF";
const smsTemplate = "DO NOT SHARE! Your one-time password to apply for business loan with Ambit Finvest is {{OTP}}. It expires in 5 minutes.";

const message = smsTemplate.replace("{{OTP}}", otp);

const url = new URL(smsGatewayUrl);
url.searchParams.set("username", smsGatewayUsername);
url.searchParams.set("password", smsGatewayPassword);
url.searchParams.set("to", mobile);
url.searchParams.set("from", smsSenderId);
url.searchParams.set("text", message);
url.searchParams.set("dlr-mask", "19");
url.searchParams.set("dlr-url", "null");

const response = await fetch(url.toString(), {
method: "GET",
headers: {
    Accept: "application/json,text/plain,*/*",
},
});

if (!response.ok) {
const text = await response.text();
throw new Error(`Failed to dispatch OTP SMS: ${response.status} ${text}`);
}
}

export async function POST(request: Request) {
try {
let body;
try {
    body = await request.json();
} catch (parseError) {
    return NextResponse.json(
    { message: "Invalid request body. Expected JSON with 'mobile' field." },
    { status: 400 }
    );
}

const mobile = body?.mobile?.trim();
const context = body?.context ?? "public";

if (!mobile || !/^\d{10}$/.test(mobile)) {
    return NextResponse.json(
    { message: "A valid 10 digit mobile number is required." },
    { status: 400 }
    );
}

const now = Date.now();
const lastRequestAt = globalAny.__ambitOtpRateLimiter.get(mobile) ?? 0;

if (now - lastRequestAt < OTP_RESEND_INTERVAL_MS) {
    const retryAfter = Math.ceil((OTP_RESEND_INTERVAL_MS - (now - lastRequestAt)) / 1000);
    return NextResponse.json(
    {
        message: "OTP already sent. Please wait before requesting again.",
        retryAfter,
    },
    {
        status: 429,
        headers: {
        "Retry-After": `${retryAfter}`,
        },
    }
    );
}

// Generate 4 digits
const otp = crypto.randomInt(1000, 9999).toString();

const token = crypto.randomUUID();
const hashedOtp = crypto.createHash("sha256").update(`${otp}:${token}`).digest("hex");
const expiresAt = now + OTP_EXPIRATION_MS;

await dispatchSms({ mobile, otp, context });

// Store OTP data in HTTP-only cookie
const otpData = JSON.stringify({ hashedOtp, mobile, expiresAt, context });

// FIX: Added 'await' before cookies()
const cookieStore = await cookies();

cookieStore.set(`otp_${token}`, otpData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: Math.round(OTP_EXPIRATION_MS / 1000),
    path: "/",
});

globalAny.__ambitOtpRateLimiter.set(mobile, now);

return NextResponse.json({
    token,
    expiresIn: Math.round(OTP_EXPIRATION_MS / 1000),
    cooldown: Math.round(OTP_RESEND_INTERVAL_MS / 1000),
});
} catch (error) {
console.error("OTP request failed", error);
return NextResponse.json(
    {
    message: "Unable to send OTP at the moment. Please try again later.",
    },
    { status: 500 }
);
}
}

export const dynamic = "force-dynamic";