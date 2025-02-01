import {NextRequest, NextResponse} from 'next/server';
import {OAuth2Client} from 'google-auth-library';
import {User} from '@/lib/models/userModel';
import {connectDB} from '@/lib/db';

// Initialize the OAuth2 client with Google credentials
const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!
});

// This route handles the callback from Google after user authentication
export async function GET(request: NextRequest) {
    try {
        // Ensure DB connection is established first
        await connectDB();

        // Retrieve the authorization code from the query parameters
        const code = request.nextUrl.searchParams.get('code');
        if (!code) {
            // If no code is present, redirect to the home page
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Exchange the authorization code for tokens
        const {tokens} = await client.getToken(code);
        // Verify the ID token received from Google
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: client._clientId
        });
        const payload = ticket.getPayload()!;

        // Check if the user already exists in the database
        let user = await User.findOne({accountId: payload.sub});

        if (!user) {
            // If user does not exist, create a new user record
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
            await user.save(); // Save the new user to the database
        } else {
            // If user exists, update their information
            if (!user.email && payload.email) {
                user.email = payload.email; // Update email if missing
            }
            user.oAuthConnection.accessToken = tokens.access_token; // Update access token
            user.oAuthConnection.refreshToken = tokens.refresh_token; // Update refresh token
            await user.save(); // Save the updated user information
        }

        // Redirect the user based on their role
        const response = NextResponse.redirect(
            new URL(
                user.role === 'none' ? 'https://connexting.ineshd.com/auth/role-select' : 'https://connexting.ineshd.com/browse',
                request.url
            )
        );

        // Set the authentication token in cookies
        response.cookies.set('authToken', tokens.access_token!, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            domain: 'connexting.ineshd.com',
            maxAge: 24 * 60 * 60, // Token expires in 24 hours
        });

        return response; // Return the response with the redirect
    } catch (error) {
        console.error('OAuth callback error:', error);
        // Return a more user-friendly error page
        return NextResponse.redirect(new URL('/auth/error', request.url));
    }
} 