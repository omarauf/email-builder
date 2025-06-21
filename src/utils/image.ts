import type { ImageMetaData } from '../types';

export async function getImageMetaData(src: string): Promise<ImageMetaData> {
  return new Promise((resolve, reject) => {
    // Create an image element
    const img = new Image();

    // Define the onload event handler to get image dimensions
    img.onload = async () => {
      // Get image dimensions
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Extract filename from the src URL
      const name = src.substring(src.lastIndexOf('/') + 1);

      try {
        const response = await fetch(src, {
          method: 'GET',
          // headers: {
          //   "Content-Type": "image/*",
          //   "Access-Control-Request-Method": "GET",
          //   "Access-Control-Allow-Origin": "*"
          // },
        });
        const size = parseInt(response.headers.get('content-length') || '0', 10);
        resolve({ name, width, height, size: size / 1024 });
      } catch {
        resolve({ name, width, height, size: 0 });
      }
    };

    // Define the onerror event handler
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Set the image source
    img.src = src;
  });
}

export function getImageDimension(
  width: number | undefined,
  height: number | undefined,
  originalWidth: number,
  originalHeight: number,
  maxWidth: number
) {
  const imageAspectRatio = originalWidth / originalHeight;

  const maxHeight = maxWidth / imageAspectRatio;
  const widthValue = width || Math.min(maxWidth, originalWidth);
  const heightValue = height || Math.min(maxHeight, originalHeight);

  return {
    imageAspectRatio,
    maxWidth: Math.round(maxWidth),
    maxHeight: Math.round(maxHeight),
    widthValue: Math.round(widthValue),
    heightValue: Math.round(heightValue),
  };
}
