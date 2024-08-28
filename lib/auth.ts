import GoogleProvider from "next-auth/providers/google"
export const NEXT_AUTH = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "openid profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
                }
            }
        })
    ], secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        session:({session,token,user}:any)=>{
            if(session &&  session.user){
                session.user.id = token.sub
                console.log(session)
                console.log(token)
            }
            return session
        }
    },pages:{
        signIn:"/signIn"
    }
}