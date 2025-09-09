import react from "react";
import { EmailCard } from "./EmailCard";

export const HeroSection = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center bg-gradient-to-r from-[#00b96b] to-[#027957] text-white px-10 py-10 gap-10 min-h-[500px] w-full">
            <div className="space-y-3">
                <h1 className="font-bold sm:text-6xl text-emerald-50 text-5xl">Land Top APM Internships and Full-Time Roles</h1>
                <h2 className="wrap-anywhere text-xl text-emerald-50 font-medium ">APM Season is the #1 place to stay up-to-date on the best and latest 2025-2026 associate product manager jobs, internships, and rotational programs at top tech companies.</h2>
            </div>
            <EmailCard/>
        </div>
    )
}