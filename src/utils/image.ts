const MAX_FILE_SIZE = 55 * 1024 * 1024; // 5MB
const MAX_DIMENSION = 1920;

export const compressImage = async (file: File): Promise<string> => {
  if (file.size <= MAX_FILE_SIZE) {
    return readFileAsDataURL(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Scale down if image is too large
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      // Compress image
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      URL.revokeObjectURL(img.src);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };
  });
};

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const validateImage = (file: File): string | null => {
  if (!file.type.startsWith('image/')) {
    return 'Please upload an image file';
  }

  if (file.size > 50 * 1024 * 1024) { // 50MB
    return 'Image size must be less than 50MB';
  }

  return null;
};