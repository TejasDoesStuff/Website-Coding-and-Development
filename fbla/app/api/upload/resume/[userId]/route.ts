import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { authenticateUser } from '@/lib/auth';

const RESUME_UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/resumes');

export async function GET(
    request: NextRequest,
    context: { params: { userId: string } }
) {
    try {
        const user = await authenticateUser(request);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const { userId } = context.params;
        const resumePath = path.join(RESUME_UPLOAD_DIR, `${userId}.pdf`);

        try {
            const fileBuffer = await fs.readFile(resumePath);
            
            return new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="resume.pdf"'
                }
            });
        } catch (error) {
            return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching resume:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}