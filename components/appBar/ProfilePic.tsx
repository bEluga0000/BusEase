import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import BarOptionsToogle from "./barOptionToggle";

const ProfilePic = async () => {
    const serverSideSession: any = await getServerSession(NEXT_AUTH);

    return (
        <div>
            {serverSideSession && (
                <div className="flex items-center gap-1 cursor-pointer">
                    <div>
                        <img
                            src={serverSideSession.user.image}
                            alt="Profile Pic"
                            className="w-8 rounded-full dark:border-[#E0E0E0] border-[#676767] border-2"
                        />
                    </div>
                    <div>
                        <BarOptionsToogle />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePic;
