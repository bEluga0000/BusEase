import { CancelBookingSchema } from "@/app/cancelBookings/page";
import { BASE_URL } from "@/lib/urls";
import axios from "axios";
import { useState } from "react";
import { FaBus, FaRegCalendarAlt, FaMapMarkerAlt, FaRegUserCircle, FaChair, FaMoneyBillAlt } from "react-icons/fa";

const CancelCard = ({ ticket }: { ticket: CancelBookingSchema }) => {
    const[cancelled,setCancelled] = useState(false)
    const[apiLoading,setApiLoading] = useState(false)
    return (
        <div className="p-5 bg-white dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#3A3A3A] rounded-lg shadow-md dark:shadow-[0_8px_16px_rgba(0,0,0,0.8)] shadow-[0_8px_16px_rgba(0,0,0,0.2)] mb-5">
            <div className="flex justify-between items-center mb-4">
                <div className="text-[#d84e55] dark:text-[#e27e84] font-extrabold text-xl">
                    {ticket.bus.comapny.name}
                </div>
                <div className="flex items-center gap-2 text-[#a1a9b2] dark:text-[#E0E0E0]">
                    <FaBus />
                    <span className="font-medium">{ticket.bus.busNumber}</span>
                </div>
            </div>
            <hr className="border-[#E0E0E0] dark:border-[#3A3A3A] mb-4" />
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <FaRegCalendarAlt className="text-[#d84e55] text-2xl" />
                    <div>
                        <div className="text-[#a1a9b2] font-bold">Departure</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">{ticket.bookedDate.split('T')[0]}</div>
                        <div className="text-[#49495b] dark:text-[#E0E0E0] font-bold">{ticket.bus.departureTime}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[#4a4a4a] dark:text-[#E0E0E0] font-extrabold">
                    <FaChair className="text-[#d84e55] text-2xl" />
                    {
                        ticket.seats.map((s) => {
                            return <span>{s.seatNo} {s.position},</span>
                        })
                    }
                </div>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#d84e55] text-2xl" />
                    <div>
                        <div className="text-[#a1a9b2] font-bold">Boarding Point</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">{ticket.bus.from}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 justify-between">
                    <FaMapMarkerAlt className="text-[#d84e55] text-2xl" />
                    <div className="text-right">
                        <div className="text-[#a1a9b2] font-bold">Dropping Point</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">{ticket.bus.destination}</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <FaRegUserCircle className="text-[#d84e55] text-2xl" />
                    <div>
                        <div className="text-[#a1a9b2] font-bold">Status</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">{ticket.conformation}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[#4a4a4a] dark:text-[#E0E0E0] font-extrabold">
                    <FaMoneyBillAlt className="text-[#d84e55] text-2xl" />
                    <span>INR {ticket.fare}</span>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className={` px-4 py-2 rounded-md font-bold  ${cancelled ? "dark:bg-gray-500 dark:text-white cursor-not-allowed bg-slate-800 text-white":"bg-[#d84e55] dark:bg-[#e27e84] text-white dark:text-black hover:bg-[#c73d4b] dark:hover:bg-[#d26f77]"}`} disabled={cancelled} onClick={async()=>{
                    try{
                        setApiLoading(true)
                        const res = await axios.patch(`${BASE_URL}/us/cancel/${ticket.id}`,{
                            date:ticket.bookedDate
                        })
                        if(!res.data)
                            throw new Error("Error while cancelling value")
                        else
                            setCancelled(true)
                    }catch(e){
                        console.log(e)
                    }finally{
                        setApiLoading(false)
                    }
                }}>
                    {apiLoading && "Cancelling...."}
                    {cancelled && !apiLoading ? "Cancelled" : "Cancel Booking"}
                </button>
            </div>
        </div>
    );
};

export default CancelCard;
