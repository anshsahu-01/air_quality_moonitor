import { NextResponse } from "next/server";
import { getDashboardSnapshot, ingestAirQualityReading } from "@/lib/server/data-service";
import { airQualityPayloadSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return NextResponse.json(snapshot);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = airQualityPayloadSchema.parse(body);
    const snapshot = await ingestAirQualityReading(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Reading accepted",
        snapshot,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.issues?.[0]?.message ?? "Invalid request payload",
      },
      { status: 400 }
    );
  }
}
