import CancelCard from "@/components/cancel/CancelBookingCard"
import React from "react"

const Cancel = ()=>{
        return <div className="pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:gap-x-6">
                <CancelCard/>
                <CancelCard />
                <CancelCard />
                <CancelCard />
                <CancelCard />
                <CancelCard />
                <CancelCard />
                <CancelCard />
                <CancelCard />

            </div>
        </div>
    }
export default Cancel