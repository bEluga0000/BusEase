"use client";
import { signIn, useSession } from "next-auth/react"
const SigninComponent = ()=>{
    return <div>
        <div className="cursor-pointer hover:scale-105 transition-all" onClick={async()=>{
            await signIn("google")
        }}>
            <div className="flex border py-2 px-4 justify-center items-center gap-6 bg-slate-200 rounded-3xl">
                <div>
                    <img src="/images/google.png" alt="Google image" className="w-11 rounded-full"/>
                </div>
                <div className="text-xl font-medium">
                    SignIn with Google
                </div>
            </div>
        </div>
    </div>
}
export default SigninComponent