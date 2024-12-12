import React from 'react';
import { User } from '../../types';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div
        className="w-32 h-32 rounded-full bg-cover bg-center mb-4"
        style={{ backgroundImage: `url(${user.profileImage || 'https://via.placeholder.com/128'})` }}
      />
      <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default ProfileHeader;