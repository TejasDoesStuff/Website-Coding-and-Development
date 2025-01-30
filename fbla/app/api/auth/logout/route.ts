import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Create a response with a redirect
  const response = NextResponse.redirect(new URL('https://connexting.ineshd.com/', request.url));

  // Delete the 'authToken' cookie
  response.cookies.delete('authToken');

  return response;
}
