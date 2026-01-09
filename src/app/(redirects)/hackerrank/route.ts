import { NextResponse } from 'next/server';

const HACKERRANK_PROFILE_URL = 'https://www.hackerrank.com/profile/anishseth0510';

export function GET() {
  return NextResponse.redirect(HACKERRANK_PROFILE_URL, 307);
}
