import { mkdir } from 'fs/promises';
import path from 'path';

const directories = [
  'public/images/defaults',
  'public/images/uploads/listings'
];

async function setupDirectories() {
  try {
    for (const dir of directories) {
      await mkdir(path.join(process.cwd(), dir), { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
    console.log('Directory setup complete');
  } catch (error) {
    console.error('Error setting up directories:', error);
    process.exit(1);
  }
}

setupDirectories(); 