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

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (limit > 16) {
      return NextResponse.json({ message: 'Limit too high' }, { status: 400 });
    }
    if (page < 1) {
      return NextResponse.json({ message: 'Invalid page number' }, { status: 400 });
    }

    const startIndex = (page - 1) * limit;
    const listings = await Listing.find().limit(limit).skip(startIndex);

    const response: Record<string, any> = {};
    listings.forEach((listing) => {
      response[listing.id] = {
        id: listing.id,
        ...listing.toObject()
      };
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
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
    });
    

    await listing.save();
    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 