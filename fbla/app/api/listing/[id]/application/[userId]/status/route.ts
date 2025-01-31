import { NextRequest, NextResponse } from 'next/server';
import { Listing } from '@/lib/models/listingModel';
import { authenticateUser } from '@/lib/auth';
import { connectDB } from '@/lib/db';

export async function PATCH(
    request: NextRequest,
    context: { params: { id: string, userId: string } }
) {
    try {
        await connectDB();

        const user = await authenticateUser(request);
        if (!user || user.role !== 'recruiter') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id, userId } = context.params;
        const { status } = await request.json();

        if (![1, -1].includes(status)) {
            return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
        }

        const listing = await Listing.findOneAndUpdate(
            { 
                _id: id,
                recruiter: user._id,
                'applications.user': userId
            },
            { 
                $set: { 
                    'applications.$.status': status 
                } 
            },
            { new: true }
        );

        if (!listing) {
            return NextResponse.json({ message: 'Listing or application not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Application status updated successfully' });
    } catch (error) {
        console.error('Error updating application status:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
} 