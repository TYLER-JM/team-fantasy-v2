import { NextResponse } from 'next/server';

export function GET() {
  console.error('We triggered te CRON job oh no')
  return NextResponse.json(
    {
      ok: true,
    },
    {
      status: 404,
    },
  );
}