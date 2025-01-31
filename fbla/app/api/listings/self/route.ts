import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authenticateUser } from '@/lib/auth';
import { Listing } from '@/lib/models/listingModel';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const user = await authenticateUser(request);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        if (user.role !== 'recruiter') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const listings = await Listing.find({ recruiter: user._id, status: 1 })
            .populate('recruiter', 'name email')
            .lean();

        // Transform the listings to match the expected format
        const transformedListings = listings.map(listing => ({
            id: listing._id,
            name: listing.name,
            description: listing.description,
            company: listing.recruiter?.name || 'Unknown Recruiter',
            recruiter: {
                name: listing.recruiter?.name || 'Unknown Recruiter',
                _id: listing.recruiter?._id
            },
            thumbnailImage: listing.photos?.[0] || '',
            expandedImages: listing.photos || [],
            hours: listing.hours.toString(),
            pay: listing.pay.toString(),
            duration: '',
            requirements: listing.qualifications || [],
            tags: listing.tags || [],
            reviews: []
        }));

        return NextResponse.json({ listings: transformedListings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 