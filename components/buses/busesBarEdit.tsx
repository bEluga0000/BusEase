import { TbArrowsExchange } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { BusesSchema } from "@/lib/Types/apiCall";
import axios from "axios";
import { BASE_URL } from "@/lib/urls";

interface BusesBarEditProps{
    from: string;
    to: string;
    date: string;
    setModifyCard: (value: boolean) => void;
    setDate: (value: string) => void;
    setFrom: (value: string) => void;
    setTo: (value: string) => void;
    setBuses: (value:BusesSchema[])=>void
    setLoading:(value:boolean)=>void
    setErr:(value:boolean)=>void
}
const BusesBarEdit = ({from,to,date,setModifyCard,setDate,setFrom,setTo,setBuses,setLoading,setErr}:BusesBarEditProps) => {
    const today = new Date().toISOString().split("T")[0]
    const[fromIn,setFromIn] = useState(from)
    const[toIn,setToIn]  = useState(to)
    const[dateIn,setDateIn] = useState(date)
    const[disable,setDisable] = useState(false)
    useEffect(()=>{
        setDisable(fromIn.length== 0 || toIn.length ==0 || dateIn.length == 0)
    },[fromIn,toIn,dateIn])
    return (
        <div className="h-24 flex items-center bg-[#f4f4f4] dark:bg-[#1f1f1f]">
            <div className="md:grid md:grid-cols-12 w-full hidden gap-1.5 px-2">
                <div className="col-span-3 flex flex-col justify-center">
                    <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                        From
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                            value={fromIn}
                            onChange={(e)=>{
                                setFromIn(e.target.value)
                            }}

                        />
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center text-[#999999] dark:text-[#a0a0a0] text-2xl cursor-pointer hover:scale-125" onClick={() => {
                    const temp = fromIn
                    setFromIn(toIn)
                    setToIn(temp)
                }}>
                    <TbArrowsExchange />
                </div>
                <div className="col-span-3 flex flex-col justify-center">
                    <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                        To
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                            value={toIn}
                            onChange={(e)=>{
                                setToIn(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-center">
                    <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                        Date
                    </div>
                    <div>
                        <input
                            type="date"
                            className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                            value={dateIn}
                            onChange={(e)=>{{
                                setDateIn(e.target.value)
                            }}}
                            min={today}
                        />
                    </div>
                </div>
                <div className="col-span-2 flex items-center text-base justify-center px-1 w-full gap-1 lg:gap-4">
                    <button className="px-2.5 py-1.5 rounded-lg bg-[#d84f55] dark:bg-[#c0392b] text-[#fcfafd] dark:text-[#fafafa] font-bold cursor-pointer" disabled={disable} onClick={async () => {
                        setModifyCard(false)
                        setDate(dateIn)
                        setTo(toIn)
                        setFrom(fromIn)
                        try {
                            setLoading(true)
                            const res = await axios.get(`${BASE_URL}/us/busFromTo?from=${fromIn}&to=${toIn}&date=${dateIn}`)
                            if (!res.data)
                                throw new Error("We didnt got the response")
                            else {
                                setErr(false)
                                setBuses(res.data.buses)
                            }
                        } catch (e: any) {
                            setErr(true)
                            console.log("Soething went wrong", e.message)
                        }
                        finally {
                            setLoading(false)
                        }
                    }}>
                        Search
                    </button>
                    <div className="text-[#7f7c7c] dark:text-[#b0b0b0] text-2xl cursor-pointer" onClick={()=>{
                        setModifyCard(false)
                    }} >
                        <MdOutlineCancel />
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className="flex flex-col md:hidden justify-between gap-1">
                <div className="grid grid-cols-10  px-2 pt-1">
                    <div className="col-span-3 flex flex-col justify-center">
                        <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                            From
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                                value={fromIn}
                                onChange={(e) => {
                                    setFromIn(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center text-[#999999] dark:text-[#a0a0a0] text-2xl cursor-pointer hover:scale-125 transition-all" onClick={()=>{
                        const temp = fromIn
                        setFromIn(toIn)
                        setToIn(temp)
                    }}>
                        <TbArrowsExchange />
                    </div>
                    <div className="col-span-3 flex flex-col justify-center">
                        <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                            To
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-full border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                                value={toIn}
                                onChange={(e) => {
                                    setToIn(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center">
                        <div className="text-sm text-[#999999] dark:text-[#a0a0a0]">
                            Date
                        </div>
                        <div>
                            <input
                                type="date"
                                className="w-fit border-b outline-none text-[#3e3e52] dark:text-[#e0e0e0] font-bold dark:border-[#444444] dark:bg-[#1f1f1f] bg-[#f4f4f4]"
                                value={dateIn}
                                onChange={(e) => {
                                    {
                                        setDateIn(e.target.value)
                                    }
                                }}
                                min={today}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-16">
                    <button className="px-2.5 py-1 rounded-lg bg-[#d84f55] dark:bg-[#c0392b] text-[#fcfafd] dark:text-[#fafafa] font-bold cursor-pointer disabled:cursor-not-allowed" 
                    disabled={disable}
                    onClick={async() => {
                        setModifyCard(false)
                        setDate(dateIn)
                        setTo(toIn)
                        setFrom(fromIn)
                        try {
                            setLoading(true)
                            const res = await axios.get(`${BASE_URL}/us/busFromTo?from=${fromIn}&to=${toIn}&date=${dateIn}`)
                            if (!res.data)
                                throw new Error("We didnt got the response")
                            else {
                                setErr(false)
                                setBuses(res.data.buses)
                            }
                        } catch (e: any) {
                            setErr(true)
                            console.log("Soething went wrong", e.message)
                        }
                        finally {
                            setLoading(false)
                        }
                    }}>
                        Search
                    </button>
                    <div className="text-[#7f7c7c] dark:text-[#b0b0b0] text-2xl cursor-pointer hover:scale-125 transition-all" onClick={() => {
                        setModifyCard(false)
                    }}>
                        <MdOutlineCancel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusesBarEdit;
