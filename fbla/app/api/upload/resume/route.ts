import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { authenticateUser } from '@/lib/auth';

// Define upload directory for resumes
const UPLOAD_BASE = path.join(process.cwd(), 'public');
const RESUME_UPLOAD_DIR = path.join(UPLOAD_BASE, 'resumes');

// Ensure upload directory exists
async function ensureDirectoryExists(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if ((error as any).code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser(request);
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();
    const resume = formData.get('file') as File;

    if (!resume) {
      return NextResponse.json({ message: 'No resume file provided' }, { status: 400 });
    }

    // Ensure the resume upload directory exists
    await ensureDirectoryExists(RESUME_UPLOAD_DIR);

    // Use the user's ID as the filename
    const filename = `${user._id}${path.extname(resume.name)}`;
    const filepath = path.join(RESUME_UPLOAD_DIR, filename);

    // Convert file to buffer and save
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the URL of the uploaded resume
    const resumeUrl = `/resumes/${filename}`;
    return NextResponse.json({ url: resumeUrl });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json({ message: 'Error uploading resume' }, { status: 500 });
  }
} 