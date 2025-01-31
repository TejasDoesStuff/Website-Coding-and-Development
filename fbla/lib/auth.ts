import { NextRequest } from 'next/server';
import { User } from '@/lib/models/userModel';

export async function authenticateUser(request: NextRequest) {
  // Get token from cookies or Authorization header
  let token = request.cookies.get('authToken')?.value;

  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return null;
  }

  try {
    const user = await User.findOne({ 'oAuthConnection.accessToken': token });
    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
} 