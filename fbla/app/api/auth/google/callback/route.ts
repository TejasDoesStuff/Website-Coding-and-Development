import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { User } from '@/lib/models/userModel';

const client = new OAuth2Client({
  clientId: '722979721080-rvskmdgcqj775v89fsnssfje3eultja3.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'https://connexting.ineshd.com/api/auth/google/callback'
});

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');
    if (!code) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: client.clientId
    });
    const payload = ticket.getPayload()!;

    let user = await User.findOne({ accountId: payload.sub });

    if (!user) {
      user = new User({
        accountId: payload.sub,
        name: payload.name,
        profileImzage: payload.picture,
        role: 'recruiter',
        oAuthConnection: {
          id: payload.sub,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }
      });
      await user.save();
    } else {
      user.oAuthConnection.accessToken = tokens.access_token;
      user.oAuthConnection.refreshToken = tokens.refresh_token;
      await user.save();
    }

    const response = NextResponse.redirect(new URL('https://connexting.ineshd.com/browse', request.url));
    response.cookies.set('authToken', tokens.access_token!, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('https://connexting.ineshd.com/browse', request.url));
  }
} 