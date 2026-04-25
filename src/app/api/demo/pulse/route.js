import { NextResponse } from "next/server";
import { injectDemoPulse } from "@/lib/server/data-service";

export const dynamic = "force-dynamic";

export async function POST() {
  const snapshot = await injectDemoPulse();
  return NextResponse.json(snapshot);
}
