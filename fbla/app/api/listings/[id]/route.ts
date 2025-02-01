import {NextRequest, NextResponse} from 'next/server';
import {authenticateUser} from '@/lib/auth';
import {Listing} from '@/lib/models/listingModel';
import {connectDB} from '@/lib/db';

interface Listing {
    _id: string;
    name: string;
    description: string;
    recruiter?: {
        name: string;
        email: string;
        _id: string;
    };
    photos?: string[];
    hours: number;
    pay: number;
    qualifications?: string[];
    tags?: string[];
}

// This route handles GET requests for a specific listing by ID.
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const user = await authenticateUser(request);
        if (!user) {
            return NextResponse.json({message: 'Not authenticated'}, {status: 401});
        }

        const {id} = await context.params;

        const listing = await Listing.findById(id)
            .populate('recruiter', 'name email')
            .lean()
            .exec() as unknown as Listing; // Ensure the query is executed and returns a single object

        if (!listing) {
            return NextResponse.json({message: 'Listing not found'}, {status: 404});
        }

        // Transform the listing data to match the expected Post interface
        const transformedListing = {
            id: listing._id,
            name: listing.name,
            description: listing.description,
            company: listing.recruiter?.name || 'Unknown Recruiter',
            recruiter: {
                name: listing.recruiter?.name || 'Unknown Recruiter',
                email: listing.recruiter?.email || null,
                _id: listing.recruiter?._id
            },
            thumbnailImage: listing.photos?.[0] || '',
            expandedImages: listing.photos || [],
            hours: listing.hours.toString(),
            pay: listing.pay.toString(),
            duration: '', // Add if available in your schema
            requirements: listing.qualifications || [],
            tags: listing.tags || [],
            reviews: [], // Add if you implement reviews
            currentUserRole: user.role  // Add the user's role to the response
        };

        return NextResponse.json(transformedListing);
    } catch (error) {
        console.error('Error fetching listing:', error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}