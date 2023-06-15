import Owner from "@/lib/Owner"
import { NextResponse } from "next/server"

export async function GET(request, {params}) {
  let ownerId = parseInt(params.owner)
  let page = params.page

  let predictions = await Owner.loadPredictions(ownerId, page)
  return NextResponse.json(predictions)
  // return predictions
} 