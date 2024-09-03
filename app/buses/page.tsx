import BusesBar from "@/components/buses/busesBar"
import BusesBarEdit from "@/components/buses/busesBarEdit"
import BusesSortBar from "@/components/buses/busesSortBars"
import ShowBuses from "@/components/buses/showBuses"

const Buses = ()=>{
    return <div className="pt-24">
        <div>
            <BusesBar/>
            {/* <BusesBarEdit/> */}
            <BusesSortBar/>
            <ShowBuses/>
            <ShowBuses />
            <ShowBuses />
            <ShowBuses />
            <ShowBuses />
            <ShowBuses />
            <ShowBuses />
            <ShowBuses />
        </div>
    </div>
}
export default Buses