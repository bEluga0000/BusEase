import { BusesSchema } from "@/lib/Types/apiCall";
import { BASE_URL } from "@/lib/urls";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaArrowRightLong, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface BusBarProps {
    from: string;
    to: string;
    date: string;
    setModifyCard: (value: boolean) => void;
    setDate: (value: string) => void;
    loading:boolean
    setLoading:(value:boolean)=>void
    setBuses: (value: BusesSchema[])=>void
    setErr:(value:boolean)=>void
}

const BusesBar = ({ from, to, date, setModifyCard, setDate,loading,setLoading,setBuses ,setErr}: BusBarProps) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formatDate = new Date(date);
    const [d, setD] = useState(formatDate);
    const [disable, setDisable] = useState<boolean>(false);
    const [bDisable,setBDisable] = useState<boolean>(loading)
    useEffect(() => {
        setDisable(today.toDateString() === d.toDateString());
    }, [d, today]);
    useEffect(()=>{
        setBDisable(loading)
    },[loading])
    const handelSubmit = async(Sdate:Date)=>{
        try {
            setBDisable(true)
            setLoading(true)
            const dd = formatDateForInput(Sdate)
            const res = await axios.get(`${BASE_URL}/us/busFromTo?from=${from}&to=${to}&date=${new Date(dd)}`)
            if (!res.data)
                throw new Error("We didnt got the response")
            else
            {
                setErr(false)
                setBuses(res.data.buses)
            }
        } catch (e: any) {
            setErr(true)
            console.log("Soething went wrong", e.message)
        }
        finally {
            setLoading(false)
            setBDisable(false)
        }
    }

    const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="h-16 flex items-center">
            <div className="flex md:pl-10 sm:pl-8 pl-4 lg:gap-12 md:gap-6 sm:gap-5 gap-3 items-center bg-[#f4f4f4] w-full pb-1.5 dark:bg-[#1f1f1f]">
                <div className="text-[#413e52] text-base font-bold dark:text-[#e0e0e0] w-20 overflow-x-auto">
                    {from}
                </div>
                <div>
                    <FaArrowRightLong className="text-[#413e52] dark:text-[#e0e0e0]" />
                </div>
                <div className="text-[#413e52] text-base font-bold dark:text-[#e0e0e0] w-20 overflow-x-auto">
                    {to}
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        className="cursor-pointer disabled:cursor-not-allowed hover:scale-150 transition-all disabled:hover:scale-100"
                        onClick={() => {
                            const newDate = new Date(d);

                            newDate.setDate(newDate.getDate() - 1);
                            if (newDate >= today) {
                                setD(newDate);
                                setDate(formatDateForInput(newDate));
                            }
                            // console.log(newDate,today)
                            handelSubmit(newDate)
                        }}
                        disabled={disable || bDisable}
                    >
                        <FaAngleLeft className="text-[#413e52] dark:text-[#e0e0e0]" />
                    </button>
                    <div className="flex flex-col items-center pt-4">
                        <div className="text-[#413e52] text-base font-bold dark:text-[#e0e0e0]">
                            {d.toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                            })}
                        </div>
                        <div className="text-xs text-[#474252] dark:text-[#b0b0b0]">
                            {d.toLocaleDateString("en-US", {
                                weekday: "short",
                            })}
                        </div>
                    </div>
                    <button
                        className="cursor-pointer hover:scale-150 transition-all
                        disabled:hover:scale-100 disabled:cursor-not-allowed"
                        onClick={() => {
                            const newDate = new Date(d);
                            newDate.setDate(newDate.getDate() + 1);
                            setD(newDate);
                            setDate(formatDateForInput(newDate));
                            setDisable(false);
                            handelSubmit(newDate)
                        }}
                    disabled={bDisable}>
                        <FaAngleRight className="text-[#413e52] dark:text-[#e0e0e0]" />
                    </button>
                </div>
                <div
                    className="border border-[#6e6d7c] px-2 py-1 rounded-lg text-[#6e7288] cursor-pointer dark:border-[#b0b0b0] dark:text-[#d0d0d0] hidden sm:block"
                    onClick={() => {
                        setModifyCard(true);
                    }}
                >
                    Modify
                </div>
                <div
                    className="border-2 border-[#6e6d7c] px-2 py-1 rounded-lg text-[#6e7288] cursor-pointer dark:border-[#b0b0b0] dark:text-[#d0d0d0] sm:hidden"
                    onClick={() => {
                        setModifyCard(true);
                    }}
                >
                    <MdEdit />
                </div>
            </div>
        </div>
    );
};

export default BusesBar;
