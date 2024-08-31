"use client";
import { TbLogout } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";

const InOut = () => {
    const serverSideSession = useSession();
    console.log(serverSideSession);

    return (
        <div>
            <div className="">
                {serverSideSession.status == "loading" && <div
                    className="text-[#676767] dark:text-[#E0E0E0] text-2xl hover:bg-[#f0f0f0] dark:hover:bg-[#2D2D2D] cursor-pointer rounded-xl flex justify-center items-center gap-2 sm:px-1.5 sm:py-1 p-2"
                >
                    <AiOutlineLoading className="md:text-2xl" />
                    <div className="text-base sm:block hidden">Loading</div>
                </div>}
                {serverSideSession.status !== "loading" && serverSideSession.data && (
                    <div
                        className="text-[#676767] dark:text-[#E0E0E0] text-2xl hover:bg-[#f0f0f0] dark:hover:bg-[#2D2D2D] cursor-pointer rounded-xl flex justify-center items-center gap-2 sm:px-1.5 sm:py-1 p-2"
                        onClick={async () => {
                            await signOut();
                        }}
                    >
                        <TbLogout className="md:text-2xl" />
                        <div className="text-base sm:block hidden">LogOut</div>
                    </div>
                )}
                {serverSideSession.status !== "loading" && !serverSideSession.data && (
                    <div
                        className="text-[#676767] dark:text-[#E0E0E0] text-2xl hover:bg-[#f0f0f0] dark:hover:bg-[#2D2D2D] cursor-pointer rounded-xl flex justify-center items-center gap-2 sm:px-1.5 sm:py-1 p-2"
                        onClick={async () => {
                            await signIn("google");
                        }}
                    >
                        <FcGoogle className="md:text-2xl" />
                        <div className="text-base sm:block hidden">SignIn with Google</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InOut;
