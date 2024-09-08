"use client";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/urls";
import { useRecoilValue } from "recoil";
import { datestate } from "@/lib/atoms/atom";
import Script from "next/script";
import { useSession } from "next-auth/react";
import PaymnetLD from "@/components/loading/paymentLD";

declare global {
    interface Window {
        Razorpay: any
    }
}
interface ticketSchema {
    id: string
    conformation: string
    // "2024-09-07T10:30:00.000Z"
    bus: {
        busNumber: string
        destination: string
        from: string
        price: string
        departureTime: string,
        comapny: {
            name: true
        }
    }
    user:{
        name:string
        email:string
    }
    bookedDate: string
    cancelledDate: null | string
    refundId: null | string
    PaymentId: null | string
    fare: number
    userId: string
    busId: string
    seats: [
        {
            seatNo: number
            position: string
        }
    ],

}
const Payment = () => {
    const session = useSession()
    const { ticketId } = useParams()
    const [ticket, setTicket] = useState<ticketSchema | null>(null)
    const rDate = useRecoilValue(datestate)
    const [loading, setLoading] = useState(true)
    const[isPProcssing,setIsProcessing]  = useState(false)
    const reverseDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/us/ticket/${ticketId}`)
                console.log(res)
                if (!res.data.ticket)
                    console.log("Something went wrong")
                else
                    setTicket(res.data.ticket)
            } catch (e) {
                setTicket(null)
                console.log(e)
            }
            finally {
                setLoading(false)
            }
        }
        init()
    }, [])
    const router = useRouter()
    return (
        <div className="pt-28 ">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            {
                session.status == "loading" && <PaymnetLD/>
            }
            {
                session.status == "unauthenticated" && <div className="w-full text-center">Login By clicking Google button on the App Bar</div>
            }
            {
                session.status == "authenticated" && loading && <PaymnetLD/>
            }
            {
                session.status == "authenticated" && !loading && !ticket && <div>Something went wrong</div>
            }
            {
                session.status == "authenticated" && !loading && ticket && <div className="px-5 flex flex-col sm:grid md:grid-cols-2 md:gap-2">
                    <div className="flex flex-col gap-4 p-5 border rounded-lg shadow-xl dark:bg-[#1F1F1F] dark:border-[#3A3A3A] bg-white border-[#E0E0E0] dark:shadow-[0_8px_30px_rgba(0,0,0,0.9)] shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                        <div className="text-[#e27e84] dark:text-[#E27E84] font-bold text-2xl">
                            {ticket.bus.comapny.name}
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
                                        {reverseDate(ticket.bookedDate)}
                                    </div>
                                    <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">
                                        {ticket.bus.departureTime} {parseInt(ticket.bus.departureTime) >12 ?"pm":"am"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start items-end">
                                <div className="font-bold text-lg text-[#a1a9b2] dark:text-[#A1A9B2]">
                                    Seats
                                </div>
                                <div className="text-[#4a4a4a] dark:text-[#E0E0E0] font-extrabold uppercase flex  flex-col">
                                    {ticket.seats.map((s)=>{
                                        return <div>
                                                {s.seatNo} {s.position}
                                        </div>
                                    })} 
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
                                        {ticket.bus.from}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[#a1a9b2] dark:text-[#A1A9B2] font-bold text-lg">
                                    Dropping Point
                                </div>
                                <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">
                                    {ticket.bus.destination}
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#fae5e5] dark:bg-[#3A3A3A] flex gap-3 py-3 px-2 rounded-md shadow-inner">
                            <div className="text-[#d9555b] dark:text-[#E27E84] text-2xl">
                                <FaRegUserCircle />
                            </div>
                            <div className="text-[#747f8d] dark:text-[#C5C6CE] text-lg font-extrabold">
                                {ticket.user.name}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-lg p-5 border gap-2 my-5 md:my-0 bg-white dark:bg-[#1F1F1F] border-[#E0E0E0] dark:border-[#3A3A3A] shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)] shadow-[0_8px_30px_rgba(0,0,0,0.1)] rounded-lg">
                        <div className="text-[#d84e55] dark:text-[#e27e84] font-extrabold">
                            FARE BREAKUP
                        </div>
                        <div className="text-[#4a4a4a] dark:text-[#E0E0E0] font-medium flex justify-between">
                            <div>
                                Onward Fare
                            </div>
                            <div>
                                INR {ticket.fare}
                            </div>
                        </div>
                        <div className="text-[#3e3e52] dark:text-[#E0E0E0] font-bold flex justify-between">
                            <div>
                                Total Payable
                            </div>
                            <div>
                                INR {ticket.fare}
                            </div>
                        </div>
                        <button className="flex justify-center bg-[#7494cc] dark:bg-[#5872a8] py-2 rounded-lg font-black text-xl uppercase cursor-pointer transition-all duration-300 hover:bg-[#597bbc] dark:hover:bg-[#4d6d9e] relative mt-3" onClick={async() => {
                            try{
                                setIsProcessing(true)
                                const res = await axios.post(`${BASE_URL}/us/razor/order`,{
                                    amount:ticket.fare*100,
                                    currency: "INR",
                                    receipt:ticket.id,
                                })
                                if(!res.data){
                                    console.log("something went wrong")
                                }
                                else{
                                    var options = {
                                        "key": process.env.NEXT_PUBLIC_RAZORY_KEY,
                                        "amount":res.data.order.amount,
                                        "currency":"INR",
                                        "name":"BUSEASE",
                                        "description":"BUSEASE Test Transaction",
                                        "image":"https://i.postimg.cc/nV94ZSH0/logo.png",
                                        "order_id":res.data.order.id,
                                        "handler":async function (response: any) {
                                            await axios.patch(`${BASE_URL}/us/ticket/${ticket.id}`,{
                                                PaymentId: response.razorpay_payment_id,
                                                amount:ticket.fare
                                            })
                                            router.push("/successfull")
                                        },
                                        "prefill":{
                                            "name":ticket.user.name,
                                            "email":ticket.user.email,
                                            "contact": "9000090000"
                                        },"notes":{
                                            "address":"Test Address"
                                        },
                                        "theme":{
                                            "color":"#3399cc"
                                        }
                                        
                                    }
                                    const rzp1 = new window.Razorpay(options)
                                    rzp1.open();
                                }
                            }
                            catch(e){
                                console.log(e)
                            }
                            finally{
                                setIsProcessing(false)
                            }
                            // 
                        }} disabled={isPProcssing}>
                            {isPProcssing ? "Processing...":"Pay Now"}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-white dark:bg-[#E0E0E0] transition-all duration-300 hover:w-full"></div>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Payment;
