import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { validateImage, compressImage } from '../../utils/image';

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (imageData: string) => Promise<void>;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onUpload, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const compressedImageData = await compressImage(file);
      await onUpload(compressedImageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? 'border-[#e63b19] bg-[#fff5f3]' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {currentImage ? (
          <div className="relative inline-block">
            <img
              src={currentImage}
              alt="Current profile"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#e63b19] text-white p-2 rounded-full shadow-lg hover:bg-[#d63516]"
              disabled={loading}
            >
              <Upload className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#e63b19] hover:text-[#d63516] font-medium"
                disabled={loading}
              >
                Click to upload
              </button>
              {' or drag and drop'}
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 50MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {loading && (
        <div className="mt-2 text-sm text-gray-600">
          Processing image...
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <X className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;