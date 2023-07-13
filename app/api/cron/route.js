import { NextResponse } from 'next/server';
// import https from 'https'
// import prisma from '@/lib/prismaClient';

export function GET() {
  
  let startTime = new Date()
  let endTime;
  let timeElapsed;
  let today = new Date()
  today.setDate(today.getDate()-1) // (-1) = yesterday
  let dateString = today.toLocaleDateString() // "3/23/2023" -- this format also works with the API

  const API_URL = `https://statsapi.web.nhl.com/api/v1/schedule?date=${dateString}&expand=schedule.linescore`


  /////// MAKE THE CALL
  return NextResponse.json({ok: true}, {status: 200})
  /////// END OF CALL

}