"use client";
import { useRouter } from "next/navigation"
const SearchButton = ()=>{
    const route = useRouter()
    return <div className="flex  items-center justify-center text-[#fcf8fc] font-extrabold text-lg dark:text-[#E0E0E0] cursor-pointer" onClick={()=>{
        route.push("/buses")
    }}>
        SEARCH BUSES
    </div>
}
export default SearchButton