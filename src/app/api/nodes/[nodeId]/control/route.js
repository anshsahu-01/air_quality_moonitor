import { NextResponse } from "next/server";
import { updateDeviceState } from "@/lib/server/data-service";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const { enabled } = await request.json();
    const snapshot = await updateDeviceState((await params).nodeId, Boolean(enabled));
    return NextResponse.json(snapshot);
  } catch {
    return NextResponse.json({ message: "Unable to update device state" }, { status: 400 });
  }
}
