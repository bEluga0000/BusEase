import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { createSeatsSchema } from "@/lib/zod/companySchema";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
export async function POST(req:NextRequest) {
    try {
        const serverSession = await getServerSession(NEXT_AUTH)
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        if (serverSession.user.role == "user")
            return NextResponse.json({ msg: "your not a company owner", err: "Access denied" }, { status: 403 })
        const companyId = req.headers.get("companyId")
        const busId = req.headers.get("busId")
        if (!companyId || !busId)
            return NextResponse.json({ msg: "Companies not Found" }, { status: 404 })
        const data = await req.json()
        const parsedData = createSeatsSchema.safeParse(data)
        if (!parsedData.success)
            return NextResponse.json({ msg: "Enter valid Data", err: parsedData.error.errors }, { status: 400 })
        const bus = await prisma.bus.findUnique({
            where:{
                busId,
                comapny:{
                    userId:serverSession.user.id
                }
            }
        }) 
        if(!bus)
            return NextResponse.json({ msg: "Bus not Found" }, { status: 404 })
        const seatsToCreate = parsedData.data.seats.map(seat => ({
            busId,
            ...seat,
        }));
        const seats = await prisma.seat.createMany({
            data:seatsToCreate
        })
        if(seats)
            return NextResponse.json({ msg: "seats Added",seats}, { status: 201})
        else
            return NextResponse.json({ msg: "seats not created" }, { status: 400 })

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
    
}