import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { User } from '@/lib/models/userModel';
import { connectDB } from '@/lib/db';

const client = new OAuth2Client({
  clientId: '722979721080-rvskmdgcqj775v89fsnssfje3eultja3.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'https://connexting.ineshd.com/api/auth/google/callback'
});

export async function GET(request: NextRequest) {
  try {
    // Ensure DB connection is established first
    await connectDB();

    const code = request.nextUrl.searchParams.get('code');
    if (!code) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: client._clientId
    });
    const payload = ticket.getPayload()!;

    let user = await User.findOne({ accountId: payload.sub });

    if (!user) {
      user = new User({
        accountId: payload.sub,
        name: payload.name,
        email: payload.email,
        profileImage: payload.picture,
        role: 'none',
        oAuthConnection: {
          id: payload.sub,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }
      });
      await user.save();
    } else {
      if (!user.email && payload.email) {
        user.email = payload.email;
      }
      user.oAuthConnection.accessToken = tokens.access_token;
      user.oAuthConnection.refreshToken = tokens.refresh_token;
      await user.save();
    }

    const response = NextResponse.redirect(
      new URL(
        user.role === 'none' ? 'https://connexting.ineshd.com/auth/role-select' : 'https://connexting.ineshd.com/browse',
        request.url
      )
    );

    response.cookies.set('authToken', tokens.access_token!, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      domain: 'connexting.ineshd.com',
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    // Return a more user-friendly error page
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }
} 