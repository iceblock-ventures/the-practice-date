import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // For MVP: append to a local JSON file
    // TODO: Replace with Cloudflare KV or D1 when deploying
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "waitlist.json");

    await fs.mkdir(dataDir, { recursive: true });

    let entries: { email: string; timestamp: string }[] = [];
    try {
      const existing = await fs.readFile(filePath, "utf-8");
      entries = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    // Check for duplicates
    if (entries.some((e) => e.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ message: "Already on the list" });
    }

    entries.push({
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
    });

    await fs.writeFile(filePath, JSON.stringify(entries, null, 2));

    return NextResponse.json({ message: "Added to waitlist" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
