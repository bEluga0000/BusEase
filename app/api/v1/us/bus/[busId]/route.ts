import { createBusSchema, getBusSchema } from "@/lib/zod/companySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
export async function GET(req: NextRequest, { params }: { params: { busId: string } }) {
    try {
        const serverSession = await getServerSession({ req, ...NEXT_AUTH })
        console.log(serverSession)
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        const busId = params.busId
        if (!busId)
            return NextResponse.json({ msg: "Enter valid Data", err: "BUSID not present" }, { status: 400 })
        const bus = await prisma.bus.findUnique({
            where: {
                busId: busId,
            }, select: {
                busId: true,
                busNumber: true,
                from: true,
                destination: true,
                departureTime: true,
                price: true,
                journeyTime: true,
                comapny: {
                    select:{
                        name: true
                    }
                },
                seats:{
                    select:{
                        seatId: true,
                        position: true,
                        datesBooked: true,
                        seatNo: true
                    }
                }
            }
        })
        if (!bus)
            return NextResponse.json({ msg: "Buse not found" }, { status: 404 })
        else
            return NextResponse.json({ msg: "successfully got bus", bus })

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}
