import { NextResponse } from 'next/server';

const GFG_PROFILE_URL = 'https://www.geeksforgeeks.org/profile/anishse10t1';

export function GET() {
  return NextResponse.redirect(GFG_PROFILE_URL, 307);
}
