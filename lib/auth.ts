import axios from "axios"
import GoogleProvider from "next-auth/providers/google"
import { BASE_URL } from "./urls"
import { redirect } from "next/dist/server/api-utils"

// Validate environment variables
const requiredEnvVars = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
}

// Check if any required env vars are missing
const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

export const NEXT_AUTH = {
    providers: [
        GoogleProvider({
            clientId: requiredEnvVars.GOOGLE_CLIENT_ID as string,
            clientSecret: requiredEnvVars.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: requiredEnvVars.NEXTAUTH_SECRET as string,
    callbacks: {
        async signIn({ user, account, profile }: any) {
            try {
                const res = await axios.post(`${BASE_URL}/us/signin`, {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                })

                // More specific status code check
                if (res.status === 200 || res.status === 201) {
                    user.role = res.data?.user?.role || "user"
                    return true
                }
                
                console.error(`Unexpected status code: ${res.status}`)
                return false
            } catch (error) {
                // More detailed error logging
                if (axios.isAxiosError(error)) {
                    console.error('Authentication error:', {
                        message: error.message,
                        status: error.response?.status,
                        data: error.response?.data
                    })
                } else {
                    console.error('Unexpected error during sign in:', error)
                }
                return false
            }
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        session: ({ session, token, user }: any) => {
            if (session?.user) {
                session.user.id = token.sub
                session.user.role = token.role
            }
            return session
        },
        async redirect({ url, baseUrl }: any) {
            return baseUrl
        },
    },
    pages: {
        signIn: "/auth"
    },
    debug: true,
}