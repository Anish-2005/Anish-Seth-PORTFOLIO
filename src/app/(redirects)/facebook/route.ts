import { NextResponse } from 'next/server';

export const runtime = 'edge';

const FACEBOOK_PROFILE_URL = 'https://www.facebook.com/anish.seth.313/';

export function GET() {
  return NextResponse.redirect(FACEBOOK_PROFILE_URL, 307);
}
