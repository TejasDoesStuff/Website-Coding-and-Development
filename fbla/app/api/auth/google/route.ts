import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
  clientId: '722979721080-rvskmdgcqj775v89fsnssfje3eultja3.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'https://connexting.ineshd.com/api/auth/google/callback'
});

export async function GET(request: NextRequest) {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email']
  });

  return NextResponse.redirect(authUrl);
} 