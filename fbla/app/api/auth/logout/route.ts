import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
    // Create a response with a redirect
    const response = NextResponse.redirect(new URL('https://connexting.ineshd.com/', request.url));

    // Delete the 'authToken' cookie by setting it with an expired date
    response.cookies.set('authToken', '', {
        maxAge: -1, // Set maxAge to -1 to delete the cookie
        path: '/', // Ensure the path matches where the cookie was set
        domain: 'connexting.ineshd.com', // Specify the domain if necessary
    });

    return response;
}
