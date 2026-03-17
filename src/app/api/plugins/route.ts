import { NextRequest, NextResponse } from "next/server";
import type { Plugin } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ message: "Plugins endpoint" });
}

export async function POST(request: NextRequest) {
  try {
    const body: { plugins: Plugin[] } = await request.json();

    if (!body.plugins || !Array.isArray(body.plugins)) {
      return NextResponse.json(
        { error: "Invalid plugins payload" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, plugins: body.plugins });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
