import { useTheme } from 'next-themes';
import { TiAdjustBrightness } from "react-icons/ti";
import { FaMoon } from "react-icons/fa6";

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <div onClick={toggleTheme} className="cursor-pointer">
            {resolvedTheme === "dark" ? (
                <div className=" text-[#676767] dark:text-[#E0E0E0] text-2xl hover:bg-[#f0f0f0] dark:hover:bg-[#2D2D2D] cursor-pointer rounded-xl flex justify-center items-center gap-2 sm:px-1.5 sm:py-1 p-2">
                    <TiAdjustBrightness className="md:text-2xl" />
                    <div className="text-base sm:block hidden">Theme</div>
                </div>
            ) : (
                <div className="text-[#676767] dark:text-[#E0E0E0] text-2xl hover:bg-[#f0f0f0] dark:hover:bg-[#2D2D2D] cursor-pointer rounded-xl flex justify-center items-center gap-2 sm:px-1.5 sm:py-1 p-2">
                    <FaMoon className="md:text-2xl" />
                    <div className="text-base sm:block hidden">Theme</div>
                </div>
            )}
        </div>
    );
};

export default ThemeButton;
