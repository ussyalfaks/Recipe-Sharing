import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ImageUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (imageUrl: string) => void;
}

const ImageUpdateModal: React.FC<ImageUpdateModalProps> = ({ isOpen, onClose, onUpdate }) => {
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(imageUrl);
    setImageUrl('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Recipe Image</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#e63b19] focus:border-[#e63b19]"
              placeholder="Enter image URL"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#e63b19] text-white rounded-md hover:bg-[#d63516]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpdateModal;