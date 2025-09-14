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
        <div className="inset-0 min-w-full min-h-screen glass-effect flex items-center justify-center z-100 p-4">
            <div className="relative -top-4 -right-4 min-h-screen w-full">
                <button
                    onClick={onClose}
                    className="absolute  bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
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
