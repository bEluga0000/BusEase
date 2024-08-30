import { useTheme } from 'next-themes'
import { TiAdjustBrightness } from "react-icons/ti";
import { FaMoon } from "react-icons/fa6";
const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme()
    return <div>
        <div onClick={() => {
            setTheme(resolvedTheme == "dark" ? 'light' : "dark")
        }} className='border p-1.5 rounded-xl bg-[#F5F5F5] dark:bg-transparent'>
            {
                resolvedTheme === "dark" && <TiAdjustBrightness className="text-2xl " />
            }
            {
                resolvedTheme == "light" && <FaMoon className="text-2xl"/>

            }
        </div>
    </div>
}
export default ThemeButton