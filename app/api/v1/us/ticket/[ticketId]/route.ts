import { AddPaymentIdSchema, createTicketSchema } from "@/lib/zod/userSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        const serverSession = await getServerSession(NEXT_AUTH);
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 });
        const userId = serverSession.user.id;
        const ticketId = params.ticketId

        if (!ticketId || !userId)
            return NextResponse.json({ msg: "Ticket Id and User ID are required", err: "Ticket Id or User ID not provided" }, { status: 400 });

        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId,
                userId
            },
            include: {
                seats: {
                    select: {
                        seatNo: true,
                        position: true
                    }
                },
                bus:{
                    select:{
                        from:true,
                        destination:true,
                        price:true,
                        busNumber:true,
                        departureTime:true,
                        comapny:{
                            select:{
                                name:true
                            }
                        }
                    }
                },
                user:{
                    select:{
                        name:true,
                        email:true
                    }
                }

            }
        });

        if (!ticket) {
            return NextResponse.json({ msg: "Error while getting the ticket" }, { status: 404 });
        }
        return NextResponse.json({ msg: "Tickets booked successfully", ticket: ticket }, { status: 201 });
    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({ msg: "Internal server Error", err: e.message }, { status: 500 });
    }
}
export async function PATCH(req: NextRequest, { params }: { params: { ticketId: string } }) {
    const serverSession = await getServerSession(NEXT_AUTH);
    if (!serverSession)
        return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 });

    const userId = serverSession.user.id;
    const ticketId = params.ticketId;
    console.log(ticketId,userId)
    const data = await req.json();
    const parsedData = AddPaymentIdSchema.safeParse(data);

    if (!ticketId || !userId)
        return NextResponse.json({ msg: "Ticket Id and User ID are required", err: "Ticket Id or User ID not provided" }, { status: 400 });

    if (!parsedData.success)
        return NextResponse.json({ msg: "Send correct input values", err: parsedData.error.errors }, { status: 400 });

    // Check if the ticket exists and has the correct status
    const ticket = await prisma.ticket.findFirst({
        where: {
            id: ticketId,
            userId,
        }
    });

    if (!ticket) {
        return NextResponse.json({ msg: "Ticket not found or not confirmed", err: "Ticket not found or status mismatch" }, { status: 404 });
    }

    // Create the payment record
    const payment = await prisma.payment.create({
        data: {
            id: parsedData.data.PaymentId,
            Amount: parsedData.data.amount,
            Method: "debit",
        },
        include: {
            ticket: {
                select: {
                    id: true
                }
            }
        }
    });
    if(!payment)
        return NextResponse.json({ msg: "Error in Adding the Payment Method", err: "Failed" }, { status: 400 });
    const ticketUp = await prisma.ticket.update({
        where:{
            id:ticketId,
            userId
        },
        data:{
            conformation:"confirmed",
            PaymentId:payment.id
        }
    })

    if (!ticketUp)
        return NextResponse.json({ msg: "Error in Adding the Payment Method", err: "Failed" }, { status: 400 });

    return NextResponse.json({ msg: "Updated successfully", ticketId: ticketUp.id }, { status: 201 });
}


