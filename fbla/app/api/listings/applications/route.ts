import {NextRequest, NextResponse} from 'next/server';
import {Listing} from '@/lib/models/listingModel';
import {authenticateUser} from '@/lib/auth';
import {connectDB} from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const user = await authenticateUser(request);
        if (!user || user.role !== 'recruiter') {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401});
        }

        // Find all listings by this recruiter
        const listings = await Listing.find({recruiter: user._id})
            .populate('applications.user', 'name profileImage email') // Add email to populated fields
            .lean();

        // Transform the data to be more frontend-friendly
        const applications = listings.flatMap(listing => {
            return listing.applications.map(app => ({
                listingId: listing._id,
                listingName: listing.name,
                applicant: {
                    id: app.user._id,
                    name: app.user.name,
                    email: app.user.email || `${app.user.name.toLowerCase().replace(/\s+/g, '.')}@placeholder.com`, // Add placeholder email if missing
                    profileImage: app.user.profileImage
                },
                message: app.message,
                status: app.status,
                appliedAt: app._id.getTimestamp() // MongoDB ObjectIds contain a timestamp
            }));
        });

        return NextResponse.json({applications});
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
} 