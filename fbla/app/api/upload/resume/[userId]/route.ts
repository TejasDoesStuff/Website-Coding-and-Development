import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Define upload directory for resumes
const UPLOAD_BASE = path.join(process.cwd(), 'public');
const RESUME_UPLOAD_DIR = path.join(UPLOAD_BASE, 'resumes');

export async function GET(request: NextRequest, context: { params: Promise<{ userId: string }> }) {
  const { userId } = await context.params; // Await params here
  const resumePath = path.join(RESUME_UPLOAD_DIR, `${userId}.pdf`); // Assuming PDF format

  try {
    // Check if the resume file exists
    const exists = await fs.promises.access(resumePath).then(() => true).catch(() => false);
    if (exists) {
      const response = NextResponse.json({ url: `/resumes/${userId}.pdf` });
      // Set Cache-Control header to prevent caching
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    } else {
      return NextResponse.json({ url: null });
    }
  } catch (error) {
    console.error('Error fetching resume URL:', error);
    return NextResponse.json({ message: 'Error fetching resume URL' }, { status: 500 });
  }
}