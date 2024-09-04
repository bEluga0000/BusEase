import { FaBus, FaRegCalendarAlt, FaMapMarkerAlt, FaRegUserCircle, FaChair, FaMoneyBillAlt } from "react-icons/fa";

const MyBookingsCard = () => {
    return (
        <div className="p-5 bg-white dark:bg-[#1F1F1F] border border-[#E0E0E0] dark:border-[#3A3A3A] rounded-lg shadow-md dark:shadow-[0_8px_16px_rgba(0,0,0,0.8)] shadow-[0_8px_16px_rgba(0,0,0,0.2)] mb-5">
            <div className="flex justify-between items-center mb-4">
                <div className="text-[#d84e55] dark:text-[#e27e84] font-extrabold text-xl">
                    VSRL Travels
                </div>
                <div className="flex items-center gap-2 text-[#a1a9b2] dark:text-[#E0E0E0]">
                    <FaBus />
                    <span className="font-medium">12345678</span>
                </div>
            </div>
            <hr className="border-[#E0E0E0] dark:border-[#3A3A3A] mb-4" />
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <FaRegCalendarAlt className="text-[#d84e55] text-2xl" />
                    <div>
                        <div className="text-[#a1a9b2] font-bold">Departure</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">20-3-2022</div>
                        <div className="text-[#49495b] dark:text-[#E0E0E0] font-bold">10:30 AM</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[#4a4a4a] dark:text-[#E0E0E0] font-extrabold">
                    <FaChair className="text-[#d84e55] text-2xl" />
                    <span>L3, WS</span>
                </div>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#d84e55] text-2xl" />
                    <div>
                        <div className="text-[#a1a9b2] font-bold">Boarding Point</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">Shimoga</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 justify-between">
                    <FaMapMarkerAlt className="text-[#d84e55] text-2xl" />
                    <div className="text-right">
                        <div className="text-[#a1a9b2] font-bold">Dropping Point</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">Bengaluru</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <FaRegUserCircle className="text-[#d84e55] text-2xl" />
                    <div>
                        <div className="text-[#a1a9b2] font-bold">Passenger Name</div>
                        <div className="text-[#414155] dark:text-[#E0E0E0] font-extrabold">John Doe</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[#4a4a4a] dark:text-[#E0E0E0] font-extrabold">
                    <FaMoneyBillAlt className="text-[#d84e55] text-2xl" />
                    <span>INR 9000</span>
                </div>
            </div>
        </div>
    );
};

export default MyBookingsCard;
