import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {


        const serverSession = await getServerSession(NEXT_AUTH)
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        const userId = serverSession.user.id
        // const date = req.headers.get("date")
        // if (!date)
        //     return NextResponse.json({ msg: "Constraint Date is missing", err: "Date Required" }, { status: 403 })
        const tickets = await prisma.ticket.findMany({
            where: {
                userId,
                // bookedDate:{
                //     gte:new Date(date)
                // }
                conformation:{
                    not:"cancelled"
                }
            },
            select: {
                id: true,
                bookedDate: true,
                fare: true,
                conformation: true,
                bus: {
                    select: {
                        departureTime: true,
                        from: true,
                        destination: true,
                        busNumber: true,
                        comapny: {
                            select: {
                                name: true
                            }
                        }

                    }
                },
                seats: {
                    select: {
                        seatNo: true,
                        position: true
                    }
                }
            }
        })
        if (!tickets)
            return NextResponse.json({ msg: "Error while getting the ticket" }, { status: 404 });
        else
            return NextResponse.json({ msg: "Tickets Found", tickets }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ msg: "Internal server Error", err: e.message }, { status: 500 });
    }
}