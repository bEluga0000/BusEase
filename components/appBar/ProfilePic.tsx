import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from 'next/image';
import BarOptionsToogle from "./barOptionToggle";
import { FaRegUserCircle } from "react-icons/fa";

const ProfilePic = async () => {
    const serverSideSession: any = await getServerSession(NEXT_AUTH);

    return (
        <div>
            {serverSideSession && (
                <div className="flex items-center gap-1 cursor-pointer">
                    <div>
                        {serverSideSession.user.image ? (
                            <Image
                                src={serverSideSession.user.image}
                                alt="Pic"
                                width={32}  
                                height={32} 
                                className="rounded-full dark:border-[#E0E0E0] border-[#676767] border-2"
                            />
                        ) : (
                            <FaRegUserCircle className="w-8 h-8 rounded-full dark:border-[#E0E0E0] border-[#676767] border-2" />
                        )}
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
