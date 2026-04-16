import { NextResponse } from 'next/server';

export const runtime = 'edge';

const LEETCODE_PROFILE_URL = 'https://leetcode.com/u/Anish_Seth/';

export function GET() {
  return NextResponse.redirect(LEETCODE_PROFILE_URL, 307);
}
