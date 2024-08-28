import { NextResponse } from "next/server";
import prisma from "@/lib/db"
export async function POST(req: NextResponse) {
    try {
        const ticketId = req.headers.get("ticketId")
        if(!ticketId)
            return NextResponse.json({ msg: "Please send the ticketId" }, { status: 403 })
        const ticket = await prisma.ticket.update({
            where:{
                id:ticketId
            },
            data:{
                cancelledDate:new Date(),
                conformation:"cancelled",
            }
        })
        if(!ticket)
            return NextResponse.json({msg:"Error in cancelling the ticket"},{status:404})
        else
            return NextResponse.json({msg:"Ticket got cancelled successfully"},{status:201})
    }
    catch (e: any) {
        return NextResponse.json({ msg: "Internal Server Error", err: e.message }, { status: 500 })
    }
}