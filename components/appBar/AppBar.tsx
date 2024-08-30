import AppLogoName from "./AppLogoName"
import MyBookingsAB from "./MyBookingsAB"
import ProfilePic from "./ProfilePic"
import ThemeButtonRender from "./ThemeButtonRender"
import ToggleButton from "./ToggleButton"

const AppBar = () => {
    return <div className="flex h-16 overflow-hidden bg-[#bacfe3] justify-between items-center px-4 shadow-lg">
        <div className="flex gap-10">
            <div>
                <ToggleButton />
            </div>
            <div>
                <AppLogoName />
            </div>
        </div>
        <div className="flex gap-3 items-center">
            <div>
                <ThemeButtonRender />
            </div>
            <div>
                <MyBookingsAB />
            </div>
            <div>
                <ProfilePic />
            </div>
        </div>
    </div>
}
export default AppBar