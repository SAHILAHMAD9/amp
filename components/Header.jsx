"use client"
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import Link from 'next/link';
import { AuthModal } from './auth/AuthModal';
import { LogOut } from 'lucide-react';


const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, signOut } = useAuth();
    return (
        <header className="header flex justify-around items-center h-[75px]">
            <Link href={'/'} >
            <h1 className='font-bold text-end text-2xl'>APM Season <span className="text-emerald-500">//</span></h1>
            </Link>

            <div className='flex justify-between gap-2 px-2'>
                {/* <p className='text-primary-foreground py-auto text-sm font-semibold md:text-base px-3 md:px-5 rounded-full !no-underline transition-all duration-200 hover:opacity-90 bg-gradient-to-r from-emerald-500 to-emerald-700'>Get Insted Job alerts</p> */}
                {user ? 
                <button
                    onClick={() => signOut()}
                    className="group flex items-center justify-center px-5 py-1 rounded-lg border-2 border-red-400 bg-red-400/10 backdrop-blur-sm text-red-300 font-semibold hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
                >
                    <LogOut className="mr-2 w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                    <span className="text-red-400 group-hover:text-red-500 transition-colors">Sign Out</span>
                </button> :
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