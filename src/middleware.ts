import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const lower = pathname.toLowerCase();

  if (pathname !== lower) {
    const url = req.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 301); // SEO safe permanent redirect
  }

  return NextResponse.next();
}