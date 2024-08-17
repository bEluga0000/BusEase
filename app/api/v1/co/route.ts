import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"

// once we add all the user schema we need to return user details
export async function GET(req: NextRequest, { params }: any) {
    try {
        const companies = await prisma.company.findMany()
        if (!companies)
            return NextResponse.json({ msg: "Companies not Found" }, { status: 404 })
        else
            return NextResponse.json({ msg: "companies found", companies }, { status: 201 })

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}