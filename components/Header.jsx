"use client";

import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SignInModal from './models/SignInModal';
import SignUpModal from './models/SignUpModal'; 
import { LogOut } from 'lucide-react';

const Header = () => {
    const { user, signOut } = useAuth();
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const openSignIn = () => {
        setIsSignUpOpen(false);
        setIsSignInOpen(true);
    };

    const openSignUp = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(true);
    };

    const closeAllModals = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(false);
    };

    return (
        <>
            <header className="header w-full sticky top-0 backdrop-blur-xl shadow-xl z-50 flex justify-between items-center h-[75px] lg:px-50 px-10 transition-all duration-300">
                <Link href={'/'} className="hover:scale-105 transition-transform duration-200">
                    <h1 className='font-bold text-2xl text-emerald-700 hover:text-emerald-600 transition-colors'>
                        APM Career
                    </h1>
                </Link>

                <div className='flex items-center gap-4'>
                    {user ? (
                           
                        <button
                            onClick={() => signOut()}
                            className="group flex items-center justify-center px-5 py-1 rounded-lg border-2 border-red-400 bg-red-400/10 backdrop-blur-sm text-red-300 font-semibold hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
                        >
                            <LogOut className="mr-2 w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                            <span className="text-red-400 group-hover:text-red-500 transition-colors">Sign Out</span>
                        </button>
                    ) : (
                            <button
                                onClick={openSignIn}
                                className="bg-black rounded-full w-9 h-9 flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </button>

                    )}
                </div>
            </header>

            <SignInModal
                isOpen={isSignInOpen}
                onClose={closeAllModals}
                onSwitchToSignUp={openSignUp}
            />

            <SignUpModal
                isOpen={isSignUpOpen}
                onClose={closeAllModals}
                onSwitchToSignIn={openSignIn}
            />
        </>
    );
};

export default Header;