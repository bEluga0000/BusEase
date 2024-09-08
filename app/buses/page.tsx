"use client";
import BusesBar from "@/components/buses/busesBar"
import BusesBarEdit from "@/components/buses/busesBarEdit"
import BusesSortBar from "@/components/buses/busesSortBars"
import ShowBuses from "@/components/buses/BusCard"
import axios from "axios"
import { BASE_URL } from "@/lib/urls"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { datestate, fromState, toState } from "@/lib/atoms/atom"
import { useEffect, useState } from "react";
import { BusesSchema } from "@/lib/Types/apiCall";
import { boolean } from 'zod';
import BusesLD from "@/components/loading/busesLD";
const Buses = () => {
    const from = useRecoilValue(fromState)
    const to = useRecoilValue(toState)
    const date = useRecoilValue(datestate)
    const setFrom = useSetRecoilState(fromState)
    const setTo = useSetRecoilState(toState)
    const setDate = useSetRecoilState(datestate)
    const [buses, setBuses] = useState<BusesSchema[]>([])
    const [loading, setLoading] = useState(true)
    const [modifyCard, setModifyCard] = useState<boolean>(false)
    const[err,setErr] = useState<boolean>(false) 
    const handelSubmit = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/us/busFromTo?from=${from}&to=${to}&date=${date}`)
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
        }
    }
    useEffect(() => {
        handelSubmit()
    }, [])
    return <div className="pt-24">
        <div>
            {
                !modifyCard && <BusesBar from={from} to={to} date={date} setModifyCard={setModifyCard} setDate={setDate} loading={loading} setLoading={setLoading} setBuses={setBuses} setErr={setErr}/>
            }
            {
                modifyCard && <BusesBarEdit date={date} from={from} setDate={setDate} setFrom={setFrom} setModifyCard={setModifyCard} setTo={setTo} to={to} setBuses={setBuses} setLoading={setLoading} setErr={setErr}/>
            }
            {
                loading && <BusesLD/>
            }
            {
                !loading && err && <div className='h-full flex justify-center items-center'>
                    Something Went Wrong
                </div>
            }
            {
                !loading && !err && buses.length === 0 && <div> No buses found </div>
            }
            {
                !loading && !err && buses.length > 0 && <div>
                    <BusesSortBar len={buses.length} />

                    {
                        buses.map((b) => {
                            return <ShowBuses company={b.company.name} dTime={b.departureTime} duriation={b.journeyTime} price={b.price}  id={b.busId} available={b.availableSeatsCount} booked={b.bookedSeatsCount} />
                        })
                    }
                </div>
            }

        </div>
        </div>
}
    export default Buses