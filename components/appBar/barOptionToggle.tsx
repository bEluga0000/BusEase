"use client";
import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaUserTie } from "react-icons/fa";
import { TbTicketOff } from "react-icons/tb";
import { IoTicket } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
const BarOptionsToggle = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const router = useRouter()
    return (
        <div className="relative">
            <div
                className="flex items-center gap-2 text-[#676767] dark:text-[#E0E0E0] hover:bg-[#f0f0f0] dark:hover:bg-[#333333] sm:px-1.5 sm:py-1 rounded-lg p-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="hidden sm:block">My account</div>
                <div className="transition duration-150">
                    {!dropdownOpen ? <SlArrowDown className="text-xs" /> : <SlArrowUp className="text-xs" />}
                </div>
            </div>

            {dropdownOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#3A3A3A] rounded-lg shadow-lg
                    shadow-[0_8px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.9)] z-50"
                >
                    <div className="flex flex-col text-sm text-[#676767] dark:text-[#E0E0E0]">
                        <div className="px-4 py-2 hover:bg-[#f0f0f0] dark:hover:bg-[#333333] rounded-t-lg">
                            <div className="flex justify-between items-center text-lg" onClick={() => {
                                router.push("/")
                            }}>
                                <div>
                                    Home
                                </div>
                                <div>
                                    <FaHome />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2 hover:bg-[#f0f0f0] dark:hover:bg-[#333333] rounded-t-lg">
                            <div className="flex justify-between items-center text-lg">
                                <div>
                                    My Profile
                                </div>
                                <div>
                                    <FaUserTie />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2 hover:bg-[#f0f0f0] dark:hover:bg-[#333333]" onClick={() => {
                            router.push("/cancelBookings")
                        }}><div className="flex justify-between items-center text-lg">
                                <div>
                                    Cancel Tickets
                                </div><div>
                                    <TbTicketOff />
                                </div></div></div>
                        <div className="px-4 py-2 hover:bg-[#f0f0f0] dark:hover:bg-[#333333]" onClick={() => {
                            router.push("/myBookings")
                        }}><div className="flex justify-between items-center text-lg">
                                <div>
                                    Show Tickets
                                </div><div>
                                    <IoTicket />
                                </div></div></div>
                        <div className="px-4 py-2 hover:bg-[#f0f0f0] dark:hover:bg-[#333333] rounded-b-lg"><div className="flex justify-between items-center text-lg">
                            <div>
                                LogOut
                            </div><div>
                                <VscSignOut />
                            </div></div></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BarOptionsToggle;
