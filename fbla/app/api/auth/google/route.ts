import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!
});

export async function GET(request: NextRequest) {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'profile', 
      'email',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  });

  return NextResponse.redirect(authUrl);
} 