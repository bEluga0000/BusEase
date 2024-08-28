"use client";
import {signIn, useSession} from "next-auth/react"
const SignIn = ()=>{
    return <div>
        <button onClick={async()=>{
            await signIn("google")
        }}>
            Login with google
        </button>
        <div>
        </div>
    </div>
}
export default SignIn