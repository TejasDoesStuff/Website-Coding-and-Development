import {NextRequest, NextResponse} from 'next/server';
import {mkdir, writeFile} from 'fs/promises';
import path from 'path';
import {authenticateUser} from '@/lib/auth';

// Define upload directories
const UPLOAD_BASE = path.join(process.cwd(), 'public');
const LISTINGS_UPLOAD_DIR = path.join(UPLOAD_BASE, 'images/uploads/listings');
const DEFAULT_LISTING_IMAGE = '/images/defaults/listing-default.jpg';

// Ensure upload directories exist
async function ensureDirectoryExists(dir: string) {
    try {
        await mkdir(dir, {recursive: true});
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
            return NextResponse.json({message: 'Not authenticated'}, {status: 401});
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as string;

        if (!file) {
            return NextResponse.json({message: 'No file provided'}, {status: 400});
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({message: 'File must be an image'}, {status: 400});
        }

        // Determine upload directory based on type
        let uploadDir = LISTINGS_UPLOAD_DIR;
        await ensureDirectoryExists(uploadDir);

        // Generate unique filename
        const timestamp = Date.now();
        const extension = path.extname(file.name);
        const filename = `${timestamp}${extension}`;
        const filepath = path.join(uploadDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Return the relative URL
        const imageUrl = `/images/uploads/listings/${filename}`;
        return NextResponse.json({url: imageUrl});
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({message: 'Error uploading file'}, {status: 500});
    }
} 