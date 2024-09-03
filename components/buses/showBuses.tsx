"use client";

import { useRouter } from "next/navigation";

const ShowBuses = () => {
    const route = useRouter()
    return (
        <div className="md:grid md:grid-cols-12 my-3 mx-0.5 py-3 px-0.5 flex flex-col gap-3 md:gap-0 border cursor-pointer transition-all hover:shadow-lg hover:shadow-[#888888] dark:bg-[#1F1F1F] dark:border-[#2A2A2A] border-[#E0E0E0] dark:hover:shadow-[#222222]" onClick={()=>{
            route.push("/bus/1")
        }}>
            <div className="col-span-3 flex gap-3 justify-center">
                <div className="font-semibold text-base dark:text-[#E0E0E0] text-[#393229]">
                    Srinivas Travellers
                </div>
            </div>
            <div className="grid grid-cols-5 md:col-span-9 gap-3">
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">10:30 am</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">20 hours</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">22:00 pm</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">3000rs</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">
                        <div className="flex gap-0.5">
                            <div className="text-green-600">32</div>
                            <div className="md:hidden text-green-600">AVAL</div>
                            <div className="md:block hidden text-green-600">Available</div>
                        </div>
                        <div className="flex gap-0.5">
                            <div className="text-red-600">32</div>
                            <div className="md:hidden text-red-600">Book</div>
                            <div className="md:block hidden text-red-600">Booked</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowBuses;
