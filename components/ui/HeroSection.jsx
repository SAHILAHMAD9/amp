"use client"
import React, { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, Users, Award, ChevronDown } from "lucide-react";
import { handleScrollToDiv } from "@/lib/utils";

const stats = [
    { number: "500+", label: "Job Opportunities", icon: TrendingUp },
    { number: "50+", label: "Partner Companies", icon: Users },
    { number: "95%", label: "Success Rate", icon: Award }
];
const universities = [
    "Stanford",
    "JMI",
    "Harvard",
    "Berkeley",
    "Carnegie Mellon"
];


export const HeroSection = () => {
    const [st, setSt] = useState({
        isVisible: false,
        currentStat :0
    })
    // const [isVisible, setIsVisible] = useState(false);
    // const [currentStat, setCurrentStat] = useState(0);

    useEffect(() => {
        // setIsVisible(true);
        setSt((prev) =>({...prev,isVisible:true}))
        const interval = setInterval(() => {
            setSt((prev) => ({
                ...prev,
                currentStat:  (prev.currentStat + 1) % stats.length
            }))
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/5 rounded-full blur-2xl animate-bounce delay-500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <div className={`space-y-8 transition-all duration-1000 ${st.isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-100 text-sm font-medium">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                            2025-2026 Season Now Open
                        </div>

                        {/* Main headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="block text-emerald-50">Land Top</span>
                            <span className="block bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent animate-pulse">
                                APM Roles
                            </span>
                            <span className="block text-emerald-50">at Elite Companies</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-emerald-100 leading-relaxed max-w-2xl">
                            Your comprehensive platform for discovering associate product manager internships,
                            full-time positions, and rotational programs at the world's leading technology companies.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => handleScrollToDiv("job-table-section")} className="group bg-white text-emerald-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                                Explore Opportunities
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <button onClick={() => handleScrollToDiv("faq-section")} className="border-2 border-emerald-400 text-emerald-100 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-400/10 transition-all duration-300 backdrop-blur-sm">
                                Learn More
                            </button>
                        </div>

                        {/* Trust indicators */}
                        <div className="pt-8 border-t border-emerald-400/20">
                            <p className="text-emerald-200 text-sm mb-4">Trusted by students from:</p>
                            <div className="flex flex-wrap gap-6 text-emerald-300 text-sm font-medium">
                                {universities.map((item, index) =>(
                                <span key={index} className="hover:text-emerald-100 transition-colors cursor-default">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right content - Stats card */}
                    <div className={`transition-all duration-1000 delay-300 ${st.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="relative">
                            {/* Main stats card */}
                            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/20 rounded-2xl p-8 shadow-2xl">
                                <h3 className="text-2xl font-bold text-emerald-50 mb-8 text-center">Platform Impact</h3>

                                {/* Rotating stats */}
                                <div className="space-y-6">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        const isActive = index === st.currentStat;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center overflow-hidden justify-between p-4 rounded-xl transition-all duration-500 ${isActive ? 'bg-emerald-400/20 scale-105' : 'bg-emerald-500/10'
                                                    }`}
                                            >
                                                <div className="flex items-center">
                                                    <Icon className={`w-8 h-8 mr-4 transition-colors duration-300 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                                                    <span className="text-emerald-100 font-medium">{stat.label}</span>
                                                </div>
                                                <span className={`text-2xl font-bold transition-colors duration-300 ${isActive ? 'text-emerald-200' : 'text-emerald-300'}`}>
                                                    {stat.number}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Additional info */}
                                <div className="mt-8 pt-6 border-t border-emerald-400/20 text-center">
                                    <p className="text-emerald-200 text-sm">
                                        Join thousands of successful candidates
                                    </p>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-400/30 rounded-full blur-sm animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-400/30 rounded-full blur-sm animate-pulse delay-1000"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="flex justify-center mt-16">
                    <div className="animate-bounce">
                        <ChevronDown className="w-8 h-8 text-emerald-300/70" />
                    </div>
                </div>
            </div>
        </div>
    );
};