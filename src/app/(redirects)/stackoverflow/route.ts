import { NextResponse } from 'next/server';

export const runtime = 'edge';

const STACK_OVERFLOW_PROFILE_URL = 'https://stackoverflow.com/users/27832882/anish-seth';

export function GET() {
  return NextResponse.redirect(STACK_OVERFLOW_PROFILE_URL, 307);
}
