import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: Replace with Cloudflare KV or D1 for persistence
    // For now, log the email and return success
    console.log(`Waitlist signup: ${email.toLowerCase().trim()} at ${new Date().toISOString()}`);

    return NextResponse.json({ message: "Added to waitlist" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
