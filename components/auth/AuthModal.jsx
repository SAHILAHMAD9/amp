'use client';

import { useState } from 'react';
import { LoginForm } from './LoginFrom';
import { SignupForm } from './SignupForm';

export const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
    const [mode, setMode] = useState(defaultMode);

    const handleToggleMode = () => {
        setMode(prev => prev === 'login' ? 'signup' : 'login');
    };

    const handleSuccess = () => {
        onClose?.();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-md w-full">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {mode === 'login' ? (
                    <LoginForm onToggleMode={handleToggleMode} onSuccess={handleSuccess} />
                ) : (
                    <SignupForm onToggleMode={handleToggleMode} onSuccess={handleSuccess} />
                )}
            </div>
        </div>
    );
};
