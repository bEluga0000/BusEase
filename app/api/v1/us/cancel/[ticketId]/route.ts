import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { CancelBookingSchema } from "@/lib/zod/userSchema";

export async function PATCH(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        const serverSession = await getServerSession(NEXT_AUTH);
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 });

        const ticketId = params.ticketId;
        if (!ticketId)
            return NextResponse.json({ msg: "Please send the ticketId" }, { status: 403 });

        const data = await req.json();
        const parsedData = await CancelBookingSchema.safeParse(data);
        if (!parsedData.success)
            return NextResponse.json({ msg: "Send correct input values", err: parsedData.error.errors }, { status: 400 });

        const ticket = await prisma.ticket.update({
            where: {
                id: ticketId,
                userId: serverSession.user.id
            },
            data: {
                cancelledDate: new Date(parsedData.data.date),
                conformation: "cancelled",
            },
            include: {
                seats: true
            }
        });

        if (!ticket)
            return NextResponse.json({ msg: "Error in cancelling the ticket" }, { status: 404 });

        await Promise.all(
            ticket.seats.map(async (seat) => {
                const updatedDatesBooked = seat.datesBooked.filter(
                    (date) => date.toISOString() !== new Date(parsedData.data.date).toISOString()
                );
                await prisma.seat.update({
                    where: { seatId: seat.seatId },
                    data: { datesBooked: updatedDatesBooked }
                });
            })
        );

        return NextResponse.json({ msg: "Ticket got cancelled successfully" }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ msg: "Internal Server Error", err: e.message }, { status: 500 });
    }
}
