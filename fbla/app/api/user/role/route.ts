import {NextRequest, NextResponse} from 'next/server';
import {authenticateUser} from '@/lib/auth';
import {connectDB} from '@/lib/db';

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();

        const user = await authenticateUser(request);
        if (!user) {
            return NextResponse.json({message: 'Not authenticated'}, {status: 401});
        }

        const {role} = await request.json();

        // Validate role
        if (!role || !['student', 'recruiter'].includes(role)) {
            return NextResponse.json(
                {message: 'Invalid role. Must be student or recruiter'},
                {status: 400}
            );
        }

        // Update user role
        user.role = role;
        await user.save();

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating user role:', error);
        return NextResponse.json(
            {message: 'Failed to update user role'},
            {status: 500}
        );
    }
} 