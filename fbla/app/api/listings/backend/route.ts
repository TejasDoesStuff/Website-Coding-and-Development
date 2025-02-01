import {NextRequest, NextResponse} from 'next/server';
import {Listing} from '@/lib/models/listingModel';
import {authenticateUser} from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const user = await authenticateUser(request);
        if (!user || user.role !== 'recruiter') {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401});
        }

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const filter = parseInt(searchParams.get('filter') || '0'); // 0: pending, 1: accepted, -1: rejected

        const startIndex = (page - 1) * limit;

        // Get total count based on filter
        const totalListings = await Listing.countDocuments({status: filter});

        // Get listings with pagination and populate recruiter info
        const listings = await Listing.find({status: filter})
            .skip(startIndex)
            .limit(limit)
            .populate('recruiter', 'name')
            .lean();

        const response = {
            listings,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalListings / limit),
                totalListings,
                hasMore: startIndex + limit < totalListings
            }
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
} 