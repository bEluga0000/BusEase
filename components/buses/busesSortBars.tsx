import { MdDepartureBoard } from "react-icons/md";
import { MdBusAlert } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { PiCurrencyInrFill } from "react-icons/pi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
const BusesSortBar = () => {
    return <div className="md:grid md:grid-cols-12 p-3 flex flex-col gap-3 md:gap-0">
        <div className="col-span-3 flex gap-3 justify-center">
            <div className="font-bold text-lg">
                39 buses
            </div>
            <div className="text-lg">
                Found
            </div>
        </div>
        <div className="grid grid-cols-5 md:col-span-9">
            <div className="flex justify-center ">
                <div className="hidden sm:block font-bold text-lg">Departure</div>
                <div className="sm:hidden "><MdDepartureBoard className="font-bold text-2xl"/></div>
            </div>
            <div className="flex justify-center">
                <div className="hidden sm:block font-bold text-lg">Duriation</div>
                <div className="sm:hidden "><GiDuration className="font-bold text-2xl" /></div>
            </div>
            <div className="flex justify-center font-bold text-lg">
                <div className="hidden sm:block font-bold text-lg">Arriaval</div>
                <div className="sm:hidden "><MdBusAlert className="font-bold text-2xl" /></div>
            </div>
            <div className="flex justify-center font-bold text-lg">
                <div className="hidden sm:block font-bold text-lg">Fare</div>
                <div className="sm:hidden "><PiCurrencyInrFill className="font-bold text-2xl" /></div>
            </div>
            <div className="flex justify-center font-bold text-lg">
                <div className="hidden sm:block font-bold text-lg">Seats</div>
                <div className="sm:hidden "><MdAirlineSeatReclineNormal className="font-bold text-2xl" /></div>
            </div>
        </div>
    </div>
}
export default BusesSortBar