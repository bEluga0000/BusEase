"use client";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const BarOptionsToogle = () => {
    const [oops, setOpps] = useState<boolean>(false);

    return (
        <div
            className="flex items-center gap-2 text-[#676767] dark:text-[#E0E0E0] hover:bg-[#f0f0f0] dark:hover:bg-[#333333] sm:px-1.5 sm:py-1 rounded-lg p-2 cursor-pointer"
            onClick={() => {
                setOpps(!oops);
            }}
        >
            <div className="hidden sm:block">
                My account
            </div>
            <div className="transition duration-150">
                {!oops && <SlArrowDown className="text-xs" />}
                {oops && <SlArrowUp className="text-xs" />}
            </div>
        </div>
    );
};

export default BarOptionsToogle;
