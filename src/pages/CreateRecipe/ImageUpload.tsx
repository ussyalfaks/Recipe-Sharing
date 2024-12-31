import { useState } from 'react';
import { Upload } from 'lucide-react';
import { compressImage, validateImage } from '../../utils/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const compressedImage = await compressImage(file);
      onChange(compressedImage);
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Recipe Image</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#e63b19] hover:text-[#d63516]">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                onChange={handleImageChange}
                accept="image/*"
                disabled={loading}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 50MB</p>
          {loading && (
            <p className="text-sm text-gray-600">Processing image...</p>
          )}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
      {value && (
        <div className="mt-2">
          <img src={value} alt="Recipe preview" className="h-32 w-32 object-cover rounded-md" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;