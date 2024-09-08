"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShowBuses = ({ company, dTime, duriation, price, id, available, booked}: { company: string, dTime: string, duriation: number, price: number, id: string, available: number, booked: number}) => {
    const route = useRouter()
    const formatDates = (time: string, duration: number) => {
        const [hours, minutes] = time.split(':').map(Number);
        const formattedDepartureTime = hours > 12
            ? `${hours - 12}:${minutes < 10 ? '0' : ''}${minutes} pm`
            : `${hours}:${minutes < 10 ? '0' : ''}${minutes} am`;
        const totalMinutes = hours * 60 + minutes + duration * 60; 
        const returnHours = Math.floor(totalMinutes / 60) % 24; 
        const returnMinutes = totalMinutes % 60;

        const formattedReturnTime = returnHours > 12
            ? `${returnHours - 12}:${returnMinutes < 10 ? '0' : ''}${returnMinutes} pm`
            : `${returnHours}:${returnMinutes < 10 ? '0' : ''}${returnMinutes} am`;

        return {
            fd: formattedDepartureTime,
            fr: formattedReturnTime
        };
    }

    const [fDtime,setFdTime] = useState("")
    const [fRtime,setFrTime] = useState("")
    useEffect(()=>{
        const {fd,fr}= formatDates(dTime,duriation)
        setFdTime(fd)
        setFrTime(fr)
    },[dTime,duriation])
    return (
        <div className="md:grid md:grid-cols-12 my-3 mx-0.5 py-3 px-0.5 flex flex-col gap-3 md:gap-0 border cursor-pointer transition-all hover:shadow-lg hover:shadow-[#888888] dark:bg-[#1F1F1F] dark:border-[#2A2A2A] border-[#E0E0E0] dark:hover:shadow-[#222222]" onClick={()=>{
            route.push(`/bus/${id}`)
        }} id={id}>
            <div className="col-span-3 flex gap-3 justify-center">
                <div className="font-semibold text-base dark:text-[#E0E0E0] text-[#393229]">
                    {company}
                </div>
            </div>
            <div className="grid grid-cols-5 md:col-span-9 gap-3">
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">{fDtime}</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">{duriation} hours</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">{fRtime}</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">{price}rs</div>
                </div>
                <div className="flex justify-center">
                    <div className="font-semibold sm:text-base text-sm dark:text-[#E0E0E0] text-[#393229]">
                        <div className="flex gap-0.5">
                            <div className="text-green-600">{available}</div>
                            <div className="md:hidden text-green-600">AVAL</div>
                            <div className="md:block hidden text-green-600">Available</div>
                        </div>
                        <div className="flex gap-0.5">
                            <div className="text-red-600">{booked}</div>
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
