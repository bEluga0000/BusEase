import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { createSeatsSchema } from "@/lib/zod/companySchema";
export async function POST(req:NextRequest) {
    try {
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
                companyId
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