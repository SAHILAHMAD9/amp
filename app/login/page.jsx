'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { UserProfile } from '@/components/auth/UserProfile';

const page = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Authentication Demo
        </h1>

        {user ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl text-green-600 mb-4">
                ✅ You are authenticated!
              </h2>
            </div>
            <UserProfile />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              You are not signed in. Click below to authenticate.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Open Auth Modal
              </button>
            </div>
          </div>
        )}

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="login"
        />

      </div>
    </div>
  );
};
export default page;