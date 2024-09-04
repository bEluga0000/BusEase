import { FaRegCalendarAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";

const Payment = () => {
    return (
        <div className="pt-28 px-5">
            <div className="flex flex-col gap-4 p-5 border rounded-lg shadow-xl dark:bg-[#1F1F1F] dark:border-[#3A3A3A] bg-white border-[#E0E0E0] dark:shadow-[0_8px_30px_rgba(0,0,0,0.9)] shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                <div className="text-[#e27e84] dark:text-[#E27E84] font-bold text-2xl">
                    VSM Travels
                </div>
                <hr className="border-[#E0E0E0] dark:border-[#4A4A4A]" />
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-2">
                        <div className="text-[#d9565d] dark:text-[#E27E84] text-2xl">
                            <FaRegCalendarAlt />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-[#a1a9b2] dark:text-[#A1A9B2] font-bold text-lg">
                                Departure
                            </div>
                            <div className="text-[#49495b] dark:text-[#C5C6CE] font-medium">
                                12/sep/2024
                            </div>
                            <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">
                                8:30 pm
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-end">
                        <div className="font-bold text-lg text-[#a1a9b2] dark:text-[#A1A9B2]">
                            Seats
                        </div>
                        <div className="text-[#4a4a4a] dark:text-[#E0E0E0] font-extrabold">
                            L3, WS
                        </div>
                    </div>
                </div>
                <hr className="border-[#E0E0E0] dark:border-[#4A4A4A]" />
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-2">
                        <div className="text-[#d9565d] dark:text-[#E27E84] text-2xl">
                            <GrLocation />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-[#a1a9b2] dark:text-[#A1A9B2] font-bold text-lg">
                                Boarding Point
                            </div>
                            <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">
                                Bangalore
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-[#a1a9b2] dark:text-[#A1A9B2] font-bold text-lg">
                            Dropping Point
                        </div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">
                            Shimoga
                        </div>
                    </div>
                </div>
                <div className="bg-[#fae5e5] dark:bg-[#3A3A3A] flex gap-3 py-3 px-2 rounded-md shadow-inner">
                    <div className="text-[#d9555b] dark:text-[#E27E84] text-2xl">
                        <FaRegUserCircle />
                    </div>
                    <div className="text-[#747f8d] dark:text-[#C5C6CE] text-lg font-extrabold">
                        USER NAME
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
