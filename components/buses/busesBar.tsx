import { FaArrowRightLong, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
const BusesBar = ()=>{
    return <div className="h-16 flex items-center">
        <div className="flex md:pl-10 sm:pl-8 pl-4 lg:gap-12 md:gap-6 sm:gap-5  gap-3 items-center bg-[#f4f4f4] w-full pb-1.5 dark:bg-[#1f1f1f]">
            <div className="text-[#413e52] text-base font-bold dark:text-[#e0e0e0] w-20 overflow-x-auto">
                Banglore
            </div>
            <div>
                <FaArrowRightLong className="text-[#413e52] dark:text-[#e0e0e0]" />
            </div>
            <div className="text-[#413e52] text-base font-bold dark:text-[#e0e0e0] w-20 overflow-x-auto">
                Shimoga
            </div>
            <div className="flex items-center gap-1.5">
                <div>
                    <FaAngleLeft className="text-[#413e52] dark:text-[#e0e0e0]" />
                </div>
                <div className="flex flex-col  items-center pt-4">
                    <div className="text-[#413e52] text-base font-bold dark:text-[#e0e0e0]">
                        12 Oct
                    </div>
                    <div className="text-xs text-[#474252] dark:text-[#b0b0b0]">
                        sat
                    </div>
                </div>
                <div>
                    <FaAngleRight className="text-[#413e52] dark:text-[#e0e0e0]" />
                </div>
            </div>
            <div className="border border-[#6e6d7c] px-2 py-1 rounded-lg text-[#6e7288] cursor-pointer dark:border-[#b0b0b0] dark:text-[#d0d0d0] hidden sm:block">
                Modify
            </div>
            <div className="border-2 border-[#6e6d7c] px-2 py-1 rounded-lg text-[#6e7288] cursor-pointer dark:border-[#b0b0b0] dark:text-[#d0d0d0] sm:hidden ">
                <MdEdit />
            </div>
        </div>
    </div>
}
export default BusesBar