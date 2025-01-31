import { NextRequest, NextResponse } from 'next/server';
import { Listing } from '@/lib/models/listingModel';
import { authenticateUser } from '@/lib/auth';
import { connectDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const searchQuery = request.nextUrl.searchParams.get('q') || '';
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '9');
    const seed = request.cookies.get('browseSeed')?.value || '0';
    const minHours = parseInt(request.nextUrl.searchParams.get('minHours') || '0');
    const maxHours = parseInt(request.nextUrl.searchParams.get('maxHours') || '40');

    if (limit > 16) {
      return NextResponse.json({ message: 'Limit too high' }, { status: 400 });
    }

    const startIndex = (page - 1) * limit;

    // Add user ID to match applications
    const userId = user._id;

    // Create search query with recruiter name
    const searchCriteria = {
      status: 1, // Only accepted listings
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { tags: { $regex: searchQuery, $options: 'i' } }
      ]
    };

    // Update the aggregation pipeline
    const allListings = await Listing.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'recruiter',
          foreignField: '_id',
          as: 'recruiterInfo'
        }
      },
      {
        $addFields: {
          numericHours: { $toInt: "$hours" },
          // Find the user's application if it exists
          userApplication: {
            $filter: {
              input: "$applications",
              as: "app",
              cond: { $eq: ["$$app.user", userId] }
            }
          }
        }
      },
      {
        $match: {
          status: 1,
          numericHours: { 
            $gte: minHours,
            $lte: maxHours
          },
          $or: [
            { name: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
            { tags: { $regex: searchQuery, $options: 'i' } },
            { 'recruiterInfo.name': { $regex: searchQuery, $options: 'i' } }
          ]
        }
      }
    ]);

    const totalListings = allListings.length;

    // Create a deterministic random order based on the seed
    const sortedListings = allListings.sort((a, b) => {
      const hashA = hashCode(a._id.toString() + seed);
      const hashB = hashCode(b._id.toString() + seed);
      return hashA - hashB;
    });

    // Apply pagination after sorting
    const paginatedListings = sortedListings.slice(startIndex, startIndex + limit);

    const response = {
      listings: {},
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalListings / limit),
        totalListings,
        hasMore: startIndex + limit < totalListings
      }
    };

    paginatedListings.forEach((listing) => {
      response.listings[listing._id] = {
        id: listing._id,
        ...listing,
        recruiter: {
          name: listing.recruiterInfo?.[0]?.name || 'Unknown Recruiter',
          _id: listing.recruiter
        },
        // Add application status if user has applied
        applicationStatus: listing.userApplication?.[0]?.status ?? null
      };
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to generate a consistent hash
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
} 