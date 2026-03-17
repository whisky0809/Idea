import { NextResponse } from "next/server";
import { usageStats } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ usage: usageStats });
}
