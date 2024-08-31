export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className=" flex justify-center items-center bg-blue-200 h-screen w-screen pt-16">
        <div className="md:w-3/4 w-11/12 border bg-[#F5F5F5] rounded-xl py-5 md:px-2 px-4 flex flex-col items-center gap-3">
            <div>
                <img src="/images/logo.png" alt="" className="w-20 rounded-lg" />
            </div>
            <div className="text-center">
                <div className="text-3xl font-black">
                    BUSEASE
                </div>
                <div className="text-gray-600 font-medium text-lg mt-2">
                    Sign in to access your account and streamline your travel plans.
                </div>
            </div>
            <div className="">
                {children}
            </div>
        </div>
    </div>
}