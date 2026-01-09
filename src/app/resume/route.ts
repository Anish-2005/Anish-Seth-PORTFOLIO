import { NextResponse } from 'next/server';

export function GET(request: Request) {
  // Build an absolute URL from the incoming request and point to /resume.pdf
  const redirectUrl = new URL('/resume.pdf', request.url);
  return NextResponse.redirect(redirectUrl.toString(), 307);
}
