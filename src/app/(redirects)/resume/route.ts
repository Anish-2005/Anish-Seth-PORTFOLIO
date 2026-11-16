import { NextResponse } from 'next/server';

export const runtime = 'edge';

export function GET(request: Request) {
  // Build an absolute URL from the incoming request and point to the résumé PDF.
  const redirectUrl = new URL('/anish-seth-resume.pdf', request.url);
  return NextResponse.redirect(redirectUrl.toString(), 307);
}
