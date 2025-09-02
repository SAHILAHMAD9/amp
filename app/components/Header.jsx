"use client"
import React, {useState} from 'react';

const Header = () => {
    const [sideMenu, setUseSideMenu] = useState(false);
    return (
        <div className="header flex justify-around items-center h-[75px]">
            <h1 className='font-bold text-2xl'>APM Season <span className="text-emerald-500">//</span></h1>
            <div className='flex justify-between'>
                <p className='text-primary-foreground text-sm md:text-base font-medium px-4 py-2 md:px-5 md:py-2 rounded-full !no-underline transition-all duration-200 hover:opacity-90 bg-gradient-to-r from-emerald-500 to-emerald-700'>Get Insted Job alert</p>

            </div>
        </div>
    )
}

export default Header;