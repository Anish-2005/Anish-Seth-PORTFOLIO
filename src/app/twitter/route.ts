import { NextResponse } from 'next/server';

const TWITTER_PROFILE_URL = 'https://x.com/AnishSeth170734';

export function GET() {
  return NextResponse.redirect(TWITTER_PROFILE_URL, 307);
}
