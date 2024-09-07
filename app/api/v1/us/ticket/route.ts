import { createTicketSchema } from "@/lib/zod/userSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const serverSession = await getServerSession(NEXT_AUTH);
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 });

        const { bookedDate, seatIds } = await req.json();
        const userId = serverSession.user.id;
        // const userId = req.headers.get("userId");
        const busId = req.headers.get('busId');

        if (!busId || !userId)
            return NextResponse.json({ msg: "Bus ID and User ID are required", err: "Bus ID or User ID not provided" }, { status: 400 });

        // Validate the input
        const parsedData = await createTicketSchema.safeParse({ bookedDate, seatIds, userId, busId });
        if (!parsedData.success)
            return NextResponse.json({ msg: "Send correct input values", err: parsedData.error.errors }, { status: 400 });

        // Check if all seats are available for the specific date
        const existingBookings = await prisma.seat.findMany({
            where: {
                seatId: { in: parsedData.data.seatIds },
                datesBooked: { has: parsedData.data.bookedDate },
            },
        });

        if (existingBookings.length > 0) {
            return NextResponse.json({
                msg: "One or more seats are already booked for the selected date",
                bookedSeats: existingBookings.map(booking => booking.seatId),
            }, { status: 409 });
        }

        console.log(parsedData.data.userId,  
            parsedData.data.busId,     
             parsedData.data.bookedDate,)
        // Create the ticket
        const ticket = await prisma.ticket.create({
            data: {
                userId: parsedData.data.userId,   
                busId: parsedData.data.busId,     
                bookedDate: parsedData.data.bookedDate,  
                seats: {
                    connect: parsedData.data.seatIds.map(seatId => ({ seatId })),
                },
            },
        });

        if (!ticket) {
            return NextResponse.json({ msg: "Error while booking the ticket" }, { status: 403 });
        }

        // Associate seats with the newly created ticket
        await prisma.seat.updateMany({
            where: {
                seatId: { in: parsedData.data.seatIds },
            },
            data: {
                ticketId: ticket.id,
                datesBooked: {
                    push: parsedData.data.bookedDate,
                },
            },
        });

        return NextResponse.json({ msg: "Tickets booked successfully", ticketId:ticket.id }, { status: 201 });

    } catch (e: any) {
        return NextResponse.json({ msg: "Internal server Error", err: e.message }, { status: 500 });
    }
}

