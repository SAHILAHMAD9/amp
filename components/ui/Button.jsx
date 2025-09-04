import React from "react";

export const Button = ({text,onclick}) => {

    return (
        <button onClick={onclick} className="text-white inline-flex justify-center items-center px-4 py-2 h-10 bg-[#12b981] rounded-md ">
            {text}
        </button>
    )
}