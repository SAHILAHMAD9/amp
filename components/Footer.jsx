"use client";
import React from "react";
import Link from 'next/link';
import { handleScrollToDiv } from "@/lib/utils";

export const Footer = () => {
    return (
        <footer className="text-black px-auto py-12 bg-emerald-100/90">
            <div
                className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
                           gap-x-4 gap-y-8 text-sm justify-items-start"
            >
                <div className="w-fit flex flex-col items-start col-span-1 md:col-span-1">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-1">
                        APM CONNECT
                    </h1>
                    <p className="text-sm font-normal text-black/70 mb-4">
                        Your central hub for the latest 2025-2026 Associate Product Manager roles,
                        internships, and rotational programs from top-tier companies.
                    </p>
                    {/* <div className="flex gap-4 text-emerald-600">
                        <Link href="#" aria-label="LinkedIn" className="hover:text-emerald-800 transition-colors">
                            <Linkedin size={20} />
                        </Link>
                        <Link href="#" aria-label="Instagram" className="hover:text-emerald-800 transition-colors">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" aria-label="Community" className="hover:text-emerald-800 transition-colors">
                            <Send size={20} />
                        </Link>
                    </div> */}
                </div>
                <div className="w-fit flex flex-col items-start">
                    <h2 className="font-bold text-xl mb-2">Navigate</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li>
                            <button onClick={() => handleScrollToDiv("job-table-section")} className="text-black/80 hover:underline text-left">
                                Job Listings
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleScrollToDiv("faq-section")} className="text-black/80 hover:underline text-left">
                                FAQ
                            </button>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">About Us</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className="w-fit flex flex-col items-start">
                    <h2 className="font-bold text-xl mb-2">Resources</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Career Blog</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Interview Prep</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Resume Guides</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Mentorship</Link>
                        </li>
                    </ul>
                </div>

                <div className="w-fit flex flex-col items-start">
                    <h2 className="font-bold text-xl mb-2">For Partners</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li>
                            <Link href="https://forms.gle/GojRcjrJHhkUA81q6" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:underline">Post a Job</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Sponsorships</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-black/80 hover:underline">Manage Subscription</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;