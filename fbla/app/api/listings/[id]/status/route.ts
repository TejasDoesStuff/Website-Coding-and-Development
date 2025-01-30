import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Listing } from '@/lib/models/listingModel';
import { authenticateUser } from '@/lib/auth';
import { connectDB } from '@/lib/db';


export async function PATCH(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        // Connect to MongoDB first
        await connectDB();

        const user = await authenticateUser(request);
        if (!user || user.role !== 'recruiter') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { status } = await request.json();
        console.log(status)
        const { id } = await context.params;

        const listing = await Listing.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!listing) {
            return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
        }

        return NextResponse.json(listing);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
} 