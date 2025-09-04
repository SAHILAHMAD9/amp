'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { AuthModal } from './AuthModal';

export const AuthGuard = ({ children, fallback }) => {
    const { user, loading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            setShowAuthModal(true);
        }
    }, [user, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <>
                {fallback || (
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Authentication Required
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Please sign in to access this content.
                            </p>
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                )}
                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                />
            </>
        );
    }

    return children;
};