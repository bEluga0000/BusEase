import { createTicketSchema } from "@/lib/zod/userSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
export async function POST(req:NextRequest){
    // need to add the logic that the seat is booked or not on the specific day
    try{
        const serverSession =await getServerSession(NEXT_AUTH)
        if(!serverSession)
            return NextResponse.json({msg:"Please Login before hitting this request",err:"Access denied"},{status:403})
        const {bookedDate,seatId} = await req.json()
        const userId = serverSession.user.id
        const busId = await req.headers.get('busId')
        const parsedData = await createTicketSchema.safeParse({bookedDate ,seatId, userId, busId })
        if (!parsedData.success)
            return NextResponse.json({ msg: "Send correct input values", err: parsedData.error.errors })
        else {
            const ticket = await prisma.ticket.create({
                data: {
                    userId: parsedData.data.userId,
                    seatId: parsedData.data.seatId,
                    busId: parsedData.data.busId,
                    bookedDate: parsedData.data.bookedDate,
                }
            })
            if (!ticket)
                return NextResponse.json({ msg: "Error while booking the ticket" },{status:403})
            else {
                return NextResponse.json({ mas: "Ticket Booked successfully",ticket},{status:201})
            }
        }   
    }catch(e:any){
        return NextResponse.json({msg:"Internal server Error",err:e.message},{status:500})
    }
}