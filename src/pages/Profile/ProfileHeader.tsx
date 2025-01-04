import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { updateProfileImage } from '../../store/slices/userSlice';
import { User } from '../../types';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleImageUpload = async (imageData: string) => {
    try {
      await dispatch(updateProfileImage(imageData)).unwrap();
    } catch (error) {
      console.error('Failed to update profile image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <ImageUpload
        currentImage={user.profileImage}
        onUpload={handleImageUpload}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default ProfileHeader;