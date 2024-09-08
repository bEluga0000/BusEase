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
        let date = url.searchParams.get('date')
        const parsedData = getUserBusSchema.safeParse({ from, to, date })
        if (!parsedData.success) {
            return NextResponse.json({ msg: "Enter valid Data", err: parsedData.error.errors }, { status: 400 })
        }
        date = new Date(parsedData.data.date).toISOString()
        const Allbuses = await prisma.bus.findMany({
            where: {
                from: parsedData.data.from,
                destination: parsedData.data.to
            }, select: {
                busId: true,
                busNumber: true,
                from: true,
                destination: true,
                departureTime: true,
                price: true,
                journeyTime: true,
                comapny: {
                    select: {
                        name: true
                    }
                },
                seats: {
                    select: {
                        seatId: true,
                        datesBooked: true
                    }
                }
            }
        })
        if (!Allbuses)
            return NextResponse.json({ msg: "Buses not found" }, { status: 404 })
        else
        {
            const buses = Allbuses.map(bus => {
                const bookedSeatsCount = bus.seats.filter(seat => seat.datesBooked.some(bookedDate => new Date(bookedDate).toDateString() === new Date(date!).toDateString())).length;
                const totalSeats = bus.seats.length;
                const availableSeatsCount = totalSeats - bookedSeatsCount;

                return {
                    busId: bus.busId,
                    busNumber: bus.busNumber,
                    from: bus.from,
                    destination: bus.destination,
                    departureTime: bus.departureTime,
                    price: bus.price,
                    journeyTime: bus.journeyTime,
                    company:{
                        name: bus.comapny.name
                    } ,
                    totalSeats: totalSeats,
                    availableSeatsCount: availableSeatsCount,
                    bookedSeatsCount: bookedSeatsCount
                };
            });
            return NextResponse.json({ msg: "All buses of company", buses })
        }

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}