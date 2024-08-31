import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"
export async function GET() {
    const serverSession = await getServerSession(NEXT_AUTH)
    console.log(serverSession)
    if (!serverSession){
        console.log("i am runnign")
        return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
    }
    const user = await prisma.user.findUnique({
        where: {
            id: serverSession.user.id
        }
    })
    if (!user)
        return NextResponse.json({ msg: "Internal Issue", err: "User Not Found" }, { status: 404 })
    return NextResponse.json({ msg: "user found", user }, { status: 200 })
}