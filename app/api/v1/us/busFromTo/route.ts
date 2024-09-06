import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth"; 
import { getUserBusSchema } from "@/lib/zod/userSchema";

export async function GET(req: NextRequest) {
    try {
        const serverSession = await getServerSession({ req, ...NEXT_AUTH })
        console.log(serverSession)

        const url = new URL(req.url)
        const from = url.searchParams.get('from')
        const to = url.searchParams.get('to')
        const parsedData = getUserBusSchema.safeParse({ from, to })
        if (!parsedData.success){
            return NextResponse.json({ msg: "Enter valid Data", err: parsedData.error.errors }, { status: 400 })
        }
            const buses = await prisma.bus.findMany({
                where: {
                    from:parsedData.data.from,
                    destination:parsedData.data.to
                },select:{
                    busId:true,
                    busNumber:true,
                    from:true,
                    destination:true,
                    departureTime:true,
                    price:true,
                    journeyTime:true,
                    comapny:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            if (!buses)
                return NextResponse.json({ msg: "Buses not found" }, { status: 404 })
            else
                return NextResponse.json({ msg: "All buses of company", buses })

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}