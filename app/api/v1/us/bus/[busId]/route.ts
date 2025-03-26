import { createBusSchema, getBusSchema } from "@/lib/zod/companySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index"; // assuming you have your db connection set up in lib/db
import { bus, company, seat } from "@/lib/db/schema";
export async function GET(req: NextRequest, { params }: { params: { busId: string } }) {
    try {
        const serverSession = await getServerSession({ req, ...NEXT_AUTH })
        console.log(serverSession)
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        const busId = params.busId
        if (!busId)
            return NextResponse.json({ msg: "Enter valid Data", err: "BUSID not present" }, { status: 400 })
        const busData = await db.query.bus.findFirst({
            where: eq(bus.busId, busId),
            with: {
              company: {
                columns: {
                  name: true
                }
              },
              seats: {
                columns: {
                  seatId: true,
                  position: true,
                  datesBooked: true,
                  seatNo: true
                }
              }
            }
          });

        // const busData = await db
        //     .select({
        //         busId: buses.busId,
        //         busNumber: buses.busNumber,
        //         from: buses.from,
        //         destination: buses.destination,
        //         departureTime: buses.departureTime,
        //         price: buses.price,
        //         journeyTime: buses.journeyTime,
        //         companyName: companies.name, // Selecting company name
        //     })
        //     .from(buses)
        //     .innerJoin(companies, eq(buses.companyId, companies.companyId))
        //     .where(eq(buses.busId, busId));

        // const seatData = await db
        //     .select({
        //         seatId: seats.seatId,
        //         position: seats.position,
        //         datesBooked: seats.datesBooked,
        //         seatNo: seats.seatNo,
        //     })
        //     .from(seats)
        //     .where(eq(seats.busId, busId));

        // const bus = {...busData[0], seats: seatData}


        // const bus = await prisma.bus.findUnique({
        //     where: {
        //         busId: busId,
        //     }, select: {
        //         busId: true,
        //         busNumber: true,
        //         from: true,
        //         destination: true,
        //         departureTime: true,
        //         price: true,
        //         journeyTime: true,
        //         comapny: {
        //             select:{
        //                 name: true
        //             }
        //         },
        //         seats:{
        //             select:{
        //                 seatId: true,
        //                 position: true,
        //                 datesBooked: true,
        //                 seatNo: true
        //             }
        //         }
        //     }
        // })
        // if (!busData)
        //     return NextResponse.json({ msg: "Buse not found" }, { status: 404 })
        if (!bus)
            return NextResponse.json({ msg: "Buse not found" }, { status: 404 })
        else
        {
            // console.log(busData)
            return NextResponse.json({ msg: "successfully got bus", bus:busData })
        }

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}
