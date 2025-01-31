import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Listing } from '@/lib/models/listingModel';
import { authenticateUser } from '@/lib/auth';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://inesh:rA5hSJDKr5E7Tj7F@main-db.6l0no.mongodb.net/?retryWrites=true&w=majority&appName=main-db');

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser(request);
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '9');
    const seed = request.cookies.get('browseSeed')?.value || '0';
    const minHours = parseInt(request.nextUrl.searchParams.get('minHours') || '0');
    const maxHours = parseInt(request.nextUrl.searchParams.get('maxHours') || '40');

    if (limit > 16) {
      return NextResponse.json({ message: 'Limit too high' }, { status: 400 });
    }
    if (page < 1) {
      return NextResponse.json({ message: 'Invalid page number' }, { status: 400 });
    }

    const startIndex = (page - 1) * limit;
    
    // Add hours filter to the aggregation pipeline
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
          // Convert hours string to number for comparison
          numericHours: { $toInt: "$hours" }
        }
      },
      {
        $match: {
          status: 1,
          numericHours: { 
            $gte: minHours,
            $lte: maxHours
          }
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

    const response: Record<string, any> = {
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
        }
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

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser(request);
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'recruiter') {
      return NextResponse.json({ message: 'Forbidden: Only recruiters can post listings' }, { status: 403 });
    }
    const requestData = await request.json();
    const listing = new Listing({
      name: requestData.name,
      description: requestData.description,
      pay: parseInt(requestData.pay),
      hours: parseInt(requestData.hours),
      setting: requestData.setting,
      type: requestData.type,
      address: requestData.address,
      status: 0, // Default to pending
      recruiter: user._id, // Add the recruiter's ID to the listing
      photos: requestData.photos || [] // Add the photos array
    });

    await listing.save();
    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 