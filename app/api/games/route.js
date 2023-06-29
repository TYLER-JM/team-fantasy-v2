import Owner from "@/lib/Owner";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ownerId = parseInt(searchParams.get('ownerId'))
  const addDays = parseInt(searchParams.get('addDays'))

  const res = await Owner.upcomingGames(ownerId, addDays)
  return NextResponse.json(res)
}