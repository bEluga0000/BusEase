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
    const handelSubmit = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/us/busFromTo?from=${from}&to=${to}`)
            if (!res.data)
                throw new Error("We didnt got the response")
            else
                setBuses(res.data.buses)
        } catch (e: any) {
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
        {
            loading && <div>Loading ...</div>
        }
        <div>
            {
                !modifyCard && <BusesBar from={from} to={to} date={date} setModifyCard={setModifyCard} setDate={setDate}/>
            }
            {
                modifyCard && <BusesBarEdit date={date} from={from} setDate={setDate} setFrom={setFrom} setModifyCard={setModifyCard} setTo={setTo} to={to} setBuses={setBuses} setLoading={setLoading}/>
            }
            {
                !loading && buses.length === 0 && <div> No buses found </div>
            }
            {
                !loading && buses.length > 0 && <div>
                    <BusesSortBar len={buses.length} />

                    {
                        buses.map((b) => {
                            return <ShowBuses company={b.comapny.name} dTime={b.departureTime} duriation={b.journeyTime} price={b.price} rTime={b.journeyTime + parseFloat(b.departureTime)} id={b.busId} />
                        })
                    }
                </div>
            }

        </div>
        </div>
}
    export default Buses