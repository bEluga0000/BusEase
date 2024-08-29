import { NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
export async function POST(req: NextResponse) {
    try {
        const serverSession = await getServerSession(NEXT_AUTH)
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        const ticketId = req.headers.get("ticketId")
        if(!ticketId)
            return NextResponse.json({ msg: "Please send the ticketId" }, { status: 403 })
        const ticket = await prisma.ticket.update({
            where:{
                id:ticketId,
                userId:serverSession.user.id
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