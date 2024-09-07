"use client";
import Seat from "@/components/busDetail/seats"
import { datestate } from "@/lib/atoms/atom";
import { BusDetailSchema } from "@/lib/Types/apiCall";
import { BASE_URL } from "@/lib/urls";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const BusDetail = () => {
    const router = useRouter()
    const { busId } = useParams();
    const [bus, setBus] = useState<BusDetailSchema | null>(null)
    const [loading, setLoading] = useState(true)
    const rDate = useRecoilValue(datestate)
    const [arrivalTime, setArrivalTime] = useState("")
    const [reachDate, setReachDate] = useState<string>("")
    const[selected,setSelected] = useState<number>(0)
    const [selectedId,setSelectedId] = useState<string[]>([])
    const [totalFare,setTotalFare] = useState<number>(0)
    const calculateReachTime = (departureTime:string, journeyTime:number) => {
        const [hours, minutes] = departureTime.split(":").map(Number);
        const departureDate = new Date(rDate);
        departureDate.setHours(hours, minutes, 0, 0);
        const arrivalDate = new Date(departureDate.getTime() + journeyTime * 36000000);
        const arrivalHours = String(arrivalDate.getHours()).padStart(2, '0');
        const day = String(arrivalDate.getDate()).padStart(2, '0');
        const month = arrivalDate.toLocaleString('en-US', { month: 'short' });
        const arrivalMinutes = String(arrivalDate.getMinutes()).padStart(2, '0');
        setReachDate(`${day} ${month}`)

        return setArrivalTime(`${arrivalHours}:${arrivalMinutes}`);
    };
    const isSeatBooked = (datesBooked:string[], dateToCheck:string) => {
        // Convert dateToCheck to ISO format
        const isoDateToCheck = new Date(dateToCheck).toISOString().split('T')[0];
        // Check if the date is in the datesBooked array
        return datesBooked.some(date => new Date(date).toISOString().split('T')[0] === isoDateToCheck);
    };

    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios(`${BASE_URL}/us/bus/${busId}`)
                if (!res.data.bus)
                    throw new Error("Something went wrong in finding the answer")
                else {
                    setBus(res.data.bus)
                    calculateReachTime(res.data.bus.departureTime,res.data.bus.journeyTime)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        init()
    }, [])
    useEffect(()=>{
        if(bus)
            setTotalFare(bus.price * selected) 
    },[selected])
    return <div className="pt-24">
        {
            loading && <div>Loading ....</div>
        }
        {
            !loading && !bus && <div>Something went wrong try to add the home button in this</div>
        }
        {
            !loading && bus && <div className="">
                <div className="sm:grid sm:grid-cols-2 flex flex-col gap-2 p-2">
                    <div>
                        <div className="text-lg font-bold text-center uppercase">
                            Seats
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-1  lg:grid-cols-8  py-1 border-black dark:border-white p-2">
                            {bus.seats.map((s) => {
                                return <div>
                                    <Seat booked={isSeatBooked(s.datesBooked, rDate)} position={s.position} seatId={s.seatId} seatNo={s.seatNo} selected={selected} setSelected={setSelected} selectedId={selectedId} setSelectedId={setSelectedId}/>
                                </div>
                            })}

                        </div>
                    </div>
                    
                    <div className="border flex flex-col p-3 sm:gap-6 gap-4 dark:bg-[#1F1F1F] dark:border-[#3A3A3A] bg-white border-[#E0E0E0] rounded-sm shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.9)] shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                        <div className="text-xl font-bold text-center">
                            {bus.comapny.name}
                        </div>
                        <div className="flex font-bold text-lg dark:text-[#E0E0E0] text-[#393229]">
                            <div>Boarding and Dropping</div>
                        </div>
                        <div className="flex justify-between text-lg">
                            <div className="text-[#6279a2] font-base">{bus.from}</div>
                            <div className="font-bold dark:text-[#E0E0E0] text-[#393229]">{bus.departureTime}{parseFloat(bus.departureTime) > 12 ? "PM" :"AM"}</div>
                        </div>
                        <div className="flex justify-between text-lg">
                            <div className="text-[#6279a2] font-base">{bus.destination}</div>
                            <div className="flex font-bold">
                                <div className="dark:text-[#E0E0E0] text-[#393229]">{arrivalTime}</div>
                                <div className="text-red-500">({reachDate})</div>
                            </div>
                        </div>
                        <hr className="border-[#E0E0E0] dark:border-[#3A3A3A]" />
                        <div className="font-bold text-lg dark:text-[#E0E0E0] text-[#393229]">INR{bus.price}</div>
                        <div className="flex justify-between">
                            <div>
                                <div className="dark:text-[#E0E0E0] text-[#393229]">Amount</div>
                                <div className="text-sm text-[#c7c5c7] dark:text-[#999999]">Taxes will be calculated during payment</div>
                            </div>
                            <div className="flex gap-1 font-bold dark:text-[#E0E0E0] text-[#393229]">
                                <div>INR</div>
                                <div>{totalFare}</div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="px-3 py-2 font-bold bg-[#d84e55] text-[#fdffff] rounded-md border border-[#c0383f] cursor-pointer disabled:cursor-not-allowed" onClick={async() => {
                                let isoDate = new Date(rDate)
                                isoDate.setUTCHours(10, 30, 0, 0);
                                isoDate.toISOString()
                                console.log(isoDate)
                                const res = await axios.post(`${BASE_URL}/us/ticket`,{
                                    seatIds:selectedId,
                                    bookedDate:isoDate,
                                    fare: totalFare
                                },{
                                    headers:{
                                        busId:bus.busId
                                    }
                                })
                                if(!res.data.ticketId)
                                    console.log("something wnt wrong")
                                else
                                    router.push(`/payment/${res.data.ticketId}`)   
                            }}
                            disabled={selected === 0}>Proceed To Book</button>
                        </div>
                    </div>
                </div>
            </div>
}
    </div>
}

export default BusDetail