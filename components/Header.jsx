"use client"
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import Link from 'next/link';
import { AuthModal } from './auth/AuthModal';

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, signOut } = useAuth();
    return (
        <header className="header flex justify-around items-center h-[75px]">
            <Link href={'/'} >
            <h1 className='font-bold text-end text-2xl'>APM Season <span className="text-emerald-500">//</span></h1>
            </Link>
            <div className='flex justify-between gap-2'>
                <p className='text-primary-foreground text-md font-semibold md:text-base px-4 py-1 md:px-5 rounded-full !no-underline transition-all duration-200 hover:opacity-90 bg-gradient-to-r from-emerald-500 to-emerald-700'>Get Insted Job alerts</p>
                {user ? 
                <button className='text-lg font-bold p-1 rounded-md bg-emerald-500' onClick={() => signOut()}>SignOut</button> :
                    <button
                        onClick={() => setShowAuthModal((prev) => !prev)}
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

                }
                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    defaultMode="login"
                />
            </div>
        </header>
    )
}

export default Header;