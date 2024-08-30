"use client";
import { useEffect, useState } from "react"
import ThemeButton from "./themeButton"

const ThemeButtonRender = ()=>{
    const [mounted,setMounted] = useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    return <div>
        {mounted && <ThemeButton/>}
    </div>
}
export default ThemeButtonRender