import { MyBookingSchema } from "@/app/myBookings/page";
import { useRouter } from "next/navigation";
import { FaBus, FaRegCalendarAlt, FaMapMarkerAlt, FaRegUserCircle, FaChair, FaMoneyBillAlt } from "react-icons/fa";

const MyBookingsCard = ({ ticket }: {ticket: MyBookingSchema }) => {
    const router = useRouter()
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
                        ticket.seats.map((s)=>{
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
            <div className="flex justify-between items-start">
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
            <div>
                {
                    ticket.conformation == "paymentNotDone" && <div className="w-full">
                        <button className="flex justify-center bg-[#7494cc] dark:bg-[#5872a8] py-2 rounded-lg font-black text-xl uppercase cursor-pointer transition-all duration-300 hover:bg-[#597bbc] dark:hover:bg-[#4d6d9e] relative mt-3 w-full" onClick={()=>{
                            router.push(`/payment/${ticket.id}`)
                        }}>
                            Pay Now
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-white dark:bg-[#E0E0E0] transition-all duration-300 hover:w-full"></div>
                        </button>
                        <div>

                        </div>
                    </div>
                }
            </div>
            
            
        </div>
    );
};

export default MyBookingsCard;
