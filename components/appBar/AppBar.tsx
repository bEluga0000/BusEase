// "use client";
import AppLogoName from "./AppLogoName";
import ProfilePic from "./ProfilePic";
import ThemeButtonRender from "./ThemeButtonRender";
import InOut from "./InOut";

const AppBar = () => {
    return (
        <div className="flex h-24  bg-white dark:bg-[#1F1F1F] text-black dark:text-[#E0E0E0] justify-between items-center px-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="flex gap-10">
                <div>
                    <AppLogoName />
                </div>
            </div>
            <div className="flex md:gap-10 items-center sm:gap-7 gap-5">
                <div>
                    <ThemeButtonRender />
                </div>
                <div>
                    <InOut />
                </div>
                <div>
                    <ProfilePic />
                </div>
            </div>
        </div>
    );
};

export default AppBar;
