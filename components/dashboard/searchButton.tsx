"use client";
import { fromState, toState } from "@/lib/atoms/atom";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
const SearchButton = ()=>{
    const from = useRecoilValue(fromState)
    const to = useRecoilValue(toState)
    const[disable,setDisable] = useState<boolean>(true)
    useEffect(()=>{
        if(from.length <1 || to.length <1)
            setDisable(true)
        else
            setDisable(false)
            
    },[from,to])
    const route = useRouter()
    return <button className="flex  items-center justify-center text-[#fcf8fc] font-extrabold text-lg dark:text-[#E0E0E0] cursor-pointer disabled:cursor-not-allowed w-full" onClick={()=>{
        route.push("/buses")
    }} disabled={disable}>
        SEARCH BUSES
    </button>
}
export default SearchButton