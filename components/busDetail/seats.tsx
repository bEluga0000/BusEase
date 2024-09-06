import { useEffect } from "react";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
interface SeatProps{
    booked:boolean
    seatId:string
    position:string
    seatNo:number
}
const Seat = ({booked,seatId,position,seatNo}:SeatProps)=>{
    return <div>
        {
            booked ? <div className="flex flex-col text-red-600 items-center border-red-700 border rounded-md p-0.5 cursor-not-allowed">
                <div className="">
                    <MdAirlineSeatReclineNormal className="font-bold text-2xl" />
                </div>
                <div className="flex gap-1 text-sm">
                    <div>
                        {seatNo} .
                    </div>
                    <div className="uppercase">
                        {position}
                    </div>
                </div>
            </div> : <div className="flex flex-col text-green-600 items-center border-green-700 border rounded-md p-0.5 cursor-pointer">
                <div className="">
                    <MdAirlineSeatReclineNormal className="font-bold text-2xl" />
                </div>
                <div className="flex gap-1 text-sm">
                    <div>
                        {seatNo} .
                    </div>
                        <div className="uppercase">
                        {position}
                    </div>
                </div>
            </div>
        }
    </div>
}
export default Seat