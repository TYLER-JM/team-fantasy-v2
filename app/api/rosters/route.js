import Owner from "@/lib/Owner";
import { NextResponse } from "next/server";

export async function GET() {
  const rosters = await Owner.getRosters()
  return NextResponse.json(rosters)
}