import MyBookingsCard from "@/components/MyBookings/MyBookingsCard"

const MyBookings = ()=>{
    return <div className="pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:gap-x-6">
        <MyBookingsCard/>
            <MyBookingsCard />
            <MyBookingsCard />
            <MyBookingsCard />
            <MyBookingsCard />
            <MyBookingsCard />
            <MyBookingsCard /><MyBookingsCard />

        </div>
    </div>
}
export default MyBookings