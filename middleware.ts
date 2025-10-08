import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Runs on Netlify Edge via @netlify/next
export const config = {
  // Exclude Next.js internals and static assets
  matcher: ['/((?!_next/|favicon.ico|.*\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map)).*)'],
};

export default function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  // Lightweight marker header to verify Edge execution in responses
  res.headers.set('x-edge-runtime', '1');
  return res;
}
