import { NextRequest, NextResponse } from 'next/server';
import { Listing } from '@/lib/models/listingModel';
import { authenticateUser } from '@/lib/auth';
import { connectDB } from '@/lib/db';

interface User {
    _id: string;
    id: string;
    role: string;
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const user = await authenticateUser(request) as User;
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        if (user.role !== 'student') {
            return NextResponse.json({ message: 'Only students can apply for listings' }, { status: 403 });
        }

        const { id } = await context.params;
        const { message } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ message: 'Application message is required' }, { status: 400 });
        }

        const listing = await Listing.findById(id);
        if (!listing) {
            return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
        }

        // Check if user has already applied
        const existingApplication = listing.applications.find(
            app => app.user.toString() === user._id.toString()
        );

        if (existingApplication) {
            return NextResponse.json({ message: 'You have already applied for this listing' }, { status: 400 });
        }

        // Add application with initial pending status
        listing.applications.push({
            user: user._id,
            message: message,
            status: 0
        });

        await listing.save();

        return NextResponse.json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}