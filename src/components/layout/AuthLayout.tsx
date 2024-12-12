import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen">
        {/* Simplified header for auth pages */}
        <header className="flex items-center justify-between whitespace-nowrap px-10 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-4">
            </div>
            <h2 className="text-[#181211] text-lg font-bold leading-tight tracking-[-0.015em]">
            </h2>
          </Link>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;