import axios from "axios"
import GoogleProvider from "next-auth/providers/google"
import { BASE_URL } from "./urls"
import { redirect } from "next/dist/server/api-utils"
export const NEXT_AUTH = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ], secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async signIn({user,account,profile}:any){
            try{
                console.log("i am running")
                const res = await axios.post(`${BASE_URL}/us/signin`,{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    image:user.image
                })
                if(res.status >= 200 && res.status< 300)
                {
                    console.log(res.data.role)
                    user.role = res.data.user.role? res.data.user.role : "user" 
                    return true
                }
                else
                    return false
            }catch(e){
                return false
            }
        },
        async jwt({ token, user }: any) {
            if (user)
                token.role = user.role
            return token
        },
        session:({session,token,user}:any)=>{
            if(session &&  session.user){
                session.user.id = token.sub
                session.user.role = token.role; 
            }
            return session
        },
        async redirect({url,baseUrl}:any){
            return baseUrl
        },
    },pages:{
        signIn:"/auth"
    }
}