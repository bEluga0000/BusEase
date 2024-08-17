import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"

// once we add all the user schema we need to return user details
export async function GET(req: NextRequest, { params }: any) {
    try {
        const {companyId} = params
        const company =await prisma.company.findUnique({
            where: {
                companyId
            }
        })
        if (!company)
            return NextResponse.json({ msg: "Company not found" }, { status: 404 })
        else
            return NextResponse.json({ msg: "company found", company }, { status: 201 })

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}