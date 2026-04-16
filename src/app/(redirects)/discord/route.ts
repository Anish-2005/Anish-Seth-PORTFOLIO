import { NextResponse } from 'next/server';

export const runtime = 'edge';

const DISCORD_PROFILE_URL = 'https://discord.com/users/1245782193348018238';

export function GET() {
  return NextResponse.redirect(DISCORD_PROFILE_URL, 307);
}
