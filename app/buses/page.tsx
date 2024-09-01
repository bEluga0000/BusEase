import BusesBar from "@/components/buses/busesBar"
import BusesBarEdit from "@/components/buses/busesBarEdit"

const Buses = ()=>{
    return <div className="pt-24">
        <div>
            <BusesBar/>
            <BusesBarEdit/>
        </div>
    </div>
}
export default Buses