import { NextRequest, NextResponse } from "next/server";
import type { BackendConfig } from "@/lib/types";

// In a real app this would persist to a database.
// For now we validate and echo back the configuration.
export async function GET() {
  return NextResponse.json({ message: "AI Hub config endpoint" });
}

export async function POST(request: NextRequest) {
  try {
    const body: BackendConfig = await request.json();

    if (!body.providers || !Array.isArray(body.providers)) {
      return NextResponse.json(
        { error: "Invalid providers configuration" },
        { status: 400 }
      );
    }

    if (!body.agentConfig) {
      return NextResponse.json(
        { error: "Missing agentConfig" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, config: body });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
