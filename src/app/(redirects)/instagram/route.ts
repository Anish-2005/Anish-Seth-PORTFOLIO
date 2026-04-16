import { NextResponse } from 'next/server';

export const runtime = 'edge';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/_anish.seth_/';

export function GET() {
  return NextResponse.redirect(INSTAGRAM_PROFILE_URL, 307);
}
