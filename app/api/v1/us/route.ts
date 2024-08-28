import { NextResponse } from "next/server";
import prisma from "@/lib/db"
export async function GET(req: NextResponse) {
    try {
        const userId = req.headers.get("userId")
        if (!userId)
            return NextResponse.json({ msg: "Please send the userId" }, { status: 403 })
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include:{
                company:true,
                tickets:true,
            }
        })
        if (!user)
            return NextResponse.json({ msg: "Error in finding User" }, { status: 404 })
        else
            return NextResponse.json({ msg: "user found  successfully" ,user}, { status: 201 })
    }
    catch (e: any) {
        return NextResponse.json({ msg: "Internal Server Error", err: e.message }, { status: 500 })
    }
}