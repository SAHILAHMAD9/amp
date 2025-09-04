import React from "react";
import { Button } from "./ui/Button";

export const EmailCard = () => {
    return (
        <div className="bg-white max-w-[500px] sm:w-full p-6 overflow-hidden space-y-4 rounded-md">
            <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-emerald-500"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <h2 className="text-black font-bold">Get notified when a new APM role drops</h2>
            </div>
            <form className="flex gap-2">
                <input type="email" placeholder="Subcribe" className="caret-emerald-600 focus:outline-emerald-500  h-10 grow border-1 text-emerald-600 p-2 rounded-md border-emerald-600 "/>
                <Button text={"Subscribe"}/>
            </form>
        </div>
    )
}