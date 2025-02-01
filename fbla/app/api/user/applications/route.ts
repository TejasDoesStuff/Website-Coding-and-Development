import {NextRequest, NextResponse} from 'next/server';
import {Listing} from '@/lib/models/listingModel';
import {authenticateUser} from '@/lib/auth';
import {connectDB} from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const user = await authenticateUser(request);
        if (!user || user.role !== 'student') {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401});
        }

        const listings = await Listing.find({
            'applications.user': user._id
        }).lean();

        const applications = listings.flatMap(listing => {
            const userApplication = listing.applications.find(
                app => app.user.toString() === user._id.toString()
            );
            if (!userApplication) return [];

            return [{
                listingId: listing._id,
                listingName: listing.name,
                message: userApplication.message,
                appliedAt: userApplication._id.getTimestamp(),
                status: userApplication.status
            }];
        });

        return NextResponse.json({applications});
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const user = await authenticateUser(request);
        if (!user || user.role !== 'student') {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401});
        }

        const {listingId} = await request.json();
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return NextResponse.json({message: 'Listing not found'}, {status: 404});
        }

        listing.applications = listing.applications.filter(
            app => app.user.toString() !== user._id.toString()
        );

        await listing.save();
        return NextResponse.json({message: 'Application withdrawn successfully'});
    } catch (error) {
        console.error('Error withdrawing application:', error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
} 