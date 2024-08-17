import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
export async function GET(req: NextRequest, { params }: any) {
    try {
        const {companyId} = params.companyId

        const buses = await prisma.bus.findMany({
            where: {
                companyId
            }
        })
        if (!buses)
            return NextResponse.json({ msg: "Buses not found" }, { status: 404 })
        else
            return NextResponse.json({ msg: "Bus created successfully", buses })

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}