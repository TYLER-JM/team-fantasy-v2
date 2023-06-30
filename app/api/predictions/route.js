import Owner from "@/lib/Owner";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ownerId = parseInt(searchParams.get('ownerId'))
  const addDays = parseInt(searchParams.get('addDays'))

  const res = await Owner.upcomingGames(ownerId, addDays)
  return NextResponse.json(res)
}

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  let formData = await request.formData()
  const ownerId = parseInt(searchParams.get('ownerId'))
  const savedCount = await Owner.createPredictions(ownerId, formData)
  console.log('predictions SAVED:', savedCount)

  let dashboardUrl = new URL('/', request.url)
  return NextResponse.redirect(dashboardUrl, 303)
  
}