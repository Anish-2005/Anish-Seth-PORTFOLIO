import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site.config';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.redirect(siteConfig.sameAs.github, 308);
}
