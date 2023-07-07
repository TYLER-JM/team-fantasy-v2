import { NextResponse } from 'next/server';

export function GET() {
  console.log('We triggered te CRON job')
  return NextResponse.json(
    {
      ok: true,
    },
    {
      status: 200,
    },
  );
}