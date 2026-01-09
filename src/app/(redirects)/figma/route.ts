import { NextResponse } from 'next/server';

const FIGMA_PROFILE_URL = 'https://www.figma.com/@anishseth';

export function GET() {
  return NextResponse.redirect(FIGMA_PROFILE_URL, 307);
}
