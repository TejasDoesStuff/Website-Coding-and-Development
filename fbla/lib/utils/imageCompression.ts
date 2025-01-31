import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  // Only compress if running in browser
  if (typeof window === 'undefined') {
    return file;
  }

  const options = {
    maxSizeMB: 0.5, // Max size of 500KB
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  
  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing image:", error);
    // Return original file if compression fails
    return file;
  }
} 