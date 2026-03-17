import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Integrations endpoint" });
}

export async function POST(request: NextRequest) {
  try {
    const body: { id: string; config?: Record<string, string> } =
      await request.json();

    if (!body.id || typeof body.id !== "string") {
      return NextResponse.json(
        { error: "Missing integration id" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: body.id });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
