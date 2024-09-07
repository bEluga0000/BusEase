"use client";
import MyBookingsCard from "@/components/MyBookings/MyBookingsCard"
import { BASE_URL } from "@/lib/urls";
import axios from "axios";
import { useEffect, useState } from "react";

export interface MyBookingSchema {
    id: string,
    bookedDate: string,
    fare: number | null,
    conformation: string,
    bus: {
        departureTime: string,
        from: string,
        destination: string,
        busNumber: string,
        comapny: {
            name: string
        }
    },
    seats:[ {
        seatNo: string,
        position: string
        }]
}
const MyBookings = () => {
    const[tickets,setTickets] = useState<MyBookingSchema[]>([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const init = async () => {
            try{
                const res = await axios.get(`${BASE_URL}/us/ticket`)
                if (!res.data)
                    console.log("Something went Wrong")
                else
                    setTickets(res.data.tickets)
            }catch(e:any){
                console.log(e.message)
            }finally{
                setLoading(false)
            }
            
        }
        init()
    }, [])
    return <div className="pt-24">
        {
            loading && <div>Loading ....</div>
        }
        {
            !loading && tickets.length == 0 && <div>No tickets are booked</div>
        }
        {
            !loading && tickets.length > 1 && <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:gap-x-6">
                {
                    tickets.map((t)=>{
                        return <MyBookingsCard ticket={t}/>
                    })
                }
            </div>
        }
        
    </div>
}
export default MyBookings