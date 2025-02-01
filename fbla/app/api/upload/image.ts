import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { authenticateUser } from '@/lib/auth';

const UPLOAD_BASE = path.join(process.cwd(), 'public');
const IMAGE_UPLOAD_DIR = path.join(UPLOAD_BASE, 'images'); // Directory for images

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
    const image = formData.get('file') as File; // Get the image file

    if (!image) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
    }

    // Ensure the image upload directory exists
    await ensureDirectoryExists(IMAGE_UPLOAD_DIR);

    // Use the user's ID as the filename
    const filename = `${user._id}${path.extname(image.name)}`; // Use user ID as filename
    const filepath = path.join(IMAGE_UPLOAD_DIR, filename);

    // Convert file to buffer and save
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the URL of the uploaded image
    const imageUrl = `/images/${filename}`;
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ message: 'Error uploading file' }, { status: 500 });
  }
} 