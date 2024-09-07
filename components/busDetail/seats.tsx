import { useEffect, useState } from "react";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
interface SeatProps{
    booked:boolean
    seatId:string
    position:string
    seatNo:number
    selected:number
    setSelected: ((value: number)=>void)
    selectedId:string[]
    setSelectedId:(value:string[])=>void
}
const Seat = ({booked,seatId,position,seatNo,selected,setSelected,selectedId,setSelectedId}:SeatProps)=>{
    const handleClick = () => {
        if (clicked) {
            setSelectedId(selectedId.filter(id => id !== seatId));
            setSelected(selected - 1);
        } else {
            setSelectedId([...selectedId, seatId]);
            setSelected(selected + 1);
        }
        setClicked(!clicked);
    };
    const [clicked,setClicked] = useState(false)
    return <div>
        {
            booked ? <div className="flex flex-col text-red-600 items-center border-red-700 border rounded-md p-0.5 cursor-not-allowed w-full">
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
            </div> : <div className={`flex flex-col ${clicked ? "text-yellow-400 border-yellow-600" : "text-green-600 border-green-700"} $items-center  border rounded-md p-0.5 cursor-pointer`} onClick={handleClick}
            >
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