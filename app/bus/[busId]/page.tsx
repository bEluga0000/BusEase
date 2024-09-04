"use client";
import Seat from "@/components/busDetail/seats"
import { useRouter } from "next/navigation";

const BusDetail = () => {
    const router = useRouter()
    return <div className="pt-24">
        <div className="sm:grid sm:grid-cols-2 flex flex-col gap-2 p-2">
            <div className="text-lg font-bold text-center uppercase">
                Seats
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-1 place-items-center lg:grid-cols-8 border py-1 border-black dark:border-white">
                <Seat booked/>
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked />
                <Seat booked />
                <Seat booked={false} />
                <Seat booked />
                <Seat booked />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />
                <Seat booked={false} />

            </div>
            <div className="border flex flex-col p-3 sm:gap-6 gap-4 dark:bg-[#1F1F1F] dark:border-[#3A3A3A] bg-white border-[#E0E0E0] rounded-sm shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.9)] shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                <div className="text-xl font-bold text-center">
                    BUS comapny Name
                </div>
                <div className="flex font-bold text-lg dark:text-[#E0E0E0] text-[#393229]">
                    <div>Boarding and Dropping</div>
                </div>
                <div className="flex justify-between text-lg">
                    <div className="text-[#6279a2] font-base">Bangalore</div>
                    <div className="font-bold dark:text-[#E0E0E0] text-[#393229]">20:30</div>
                </div>
                <div className="flex justify-between text-lg">
                    <div className="text-[#6279a2] font-base">Shimoga</div>
                    <div className="flex font-bold">
                        <div className="dark:text-[#E0E0E0] text-[#393229]">5.40</div>
                        <div className="text-red-500">'(13sep)'</div>
                    </div>
                </div>
                <hr className="border-[#E0E0E0] dark:border-[#3A3A3A]" />
                <div className="font-bold text-lg dark:text-[#E0E0E0] text-[#393229]">Fare Details</div>
                <div className="flex justify-between">
                    <div>
                        <div className="dark:text-[#E0E0E0] text-[#393229]">Amount</div>
                        <div className="text-sm text-[#c7c5c7] dark:text-[#999999]">Taxes will be calculated during payment</div>
                    </div>
                    <div className="flex gap-1 font-bold dark:text-[#E0E0E0] text-[#393229]">
                        <div>INR</div>
                        <div>500.00</div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="px-3 py-2 font-bold bg-[#d84e55] text-[#fdffff] rounded-md border border-[#c0383f] cursor-pointer" onClick={()=>{
                        router.push("/payment/1")
                    }}>Proceed To Book</div>
                </div>
            </div>
        </div>
    </div>
}
export default BusDetail