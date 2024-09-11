"use client";
import CancelCard from "@/components/cancel/CancelBookingCard"
import TicketCardsLD from "@/components/loading/TicketCardsLD";
import { BASE_URL } from "@/lib/urls"
import axios from "axios"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react"

export interface CancelBookingSchema {
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
    seats: [{
        seatNo: string,
        position: string
    }]
}
const Cancel = ()=>{
    const [tickets, setTickets] = useState<CancelBookingSchema[]|null>(null)
    const [loading, setLoading] = useState(true)
    const session = useSession()
    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/us/cancel`)
                if (!res.data)
                    console.log("Something went Wrong")
                else
                    setTickets(res.data.tickets)
            } catch (e: any) {
                console.log(e.message)
            } finally {
                setLoading(false)
            }

        }
        init()
    }, [])
    return <div className="pt-24">
        {
            session.status == "loading" && <TicketCardsLD />
        }
        {
            session.status == "unauthenticated" && <div className="w-full text-center">Login By clicking Google button on the App Bar</div>
        }
        {
            session.status == "authenticated" && loading && <TicketCardsLD />
        }
        {
            session.status == "authenticated" && !loading && !tickets && <div>Something went wrong</div>
        }
        {
            session.status == "authenticated" && !loading && tickets&& tickets.length == 0 && <div>No tickets are Present</div>
        }
        {
            session.status == "authenticated" && !loading && tickets &&tickets.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:gap-x-6">
                {
                    tickets.map((t) => {
                        return <CancelCard ticket={t} />
                    })
                }
            </div>
        }

    </div>
    }
export default Cancel