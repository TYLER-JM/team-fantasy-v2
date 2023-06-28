import Owner from "@/lib/Owner";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = new URL(request.url)
  const ownerId = parseInt(searchParams.get('ownerId'))
  const addDays = parseInt(searchParams.get('addDays'))

  const res = Owner.upcomingGames(ownerId, addDays)

  const games = await res.json()

  return NextResponse.json(games)
}