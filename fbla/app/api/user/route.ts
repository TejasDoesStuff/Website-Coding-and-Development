import {NextRequest, NextResponse} from 'next/server';
import {connectDB} from '@/lib/db';
import {authenticateUser} from '@/lib/auth';
import {User} from '@/lib/models/userModel';
import {Listing} from '@/lib/models/listingModel';

// GET /api/user - Get own user info
export async function GET(request: NextRequest) {
    try {
        const user = await authenticateUser(request);
        if (!user) {
            return NextResponse.json({message: 'Not authenticated'}, {status: 401});
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}

// PATCH /api/user - Update user info
export async function PATCH(request: NextRequest) {
    try {
        const user = await authenticateUser(request);
        if (!user) {
            return NextResponse.json({message: 'Not authenticated'}, {status: 401});
        }

        const data = await request.json();
        if (data.name) {
            user.name = data.name;
            await user.save();
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const user = await authenticateUser(request);

        if (!user) {
            return NextResponse.json({message: 'Not authenticated'}, {status: 401});
        }

        if (user.role === 'recruiter') {
            // Delete all listings created by this recruiter
            await Listing.deleteMany({recruiter: user._id});
        } else {
            // Remove user's applications from all listings
            await Listing.updateMany(
                {'applications.user': user._id},
                {$pull: {applications: {user: user._id}}}
            );
        }

        // Delete the user account
        await User.findByIdAndDelete(user._id);

        // Clear the authentication cookie
        const response = NextResponse.json({message: 'Account deleted successfully'});
        response.cookies.delete('authToken');

        return response;
    } catch (error) {
        console.error('Error deleting account:', error);
        return NextResponse.json(
            {message: 'Internal server error'},
            {status: 500}
        );
    }
} 