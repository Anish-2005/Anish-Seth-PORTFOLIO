import { NextResponse } from 'next/server';

export const runtime = 'edge';

const X_PROFILE_URL = 'https://x.com/AnishSeth170734';

export function GET() {
  return NextResponse.redirect(X_PROFILE_URL, 307);
}
