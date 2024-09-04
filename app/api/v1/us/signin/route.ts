import { createUserSchema } from "@/lib/zod/userSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const parsedData = await createUserSchema.safeParse(data)
        if (!parsedData.success)
            return NextResponse.json({ msg: "Enter all the valid Inputs", err: parsedData.error.errors })
        else {
            const userExist = await prisma.user.findUnique({
                where: {
                    email: parsedData.data.email
                }
            })
            if (userExist) {
                return NextResponse.json({ msg: "User Signin successful", user: userExist }, { status: 201 })
            }
            else {
                let user = await prisma.user.create({
                    data: {
                        id: parsedData.data.id,
                        name: parsedData.data.name,
                        email: parsedData.data.email,
                        image: parsedData.data.image,
                    }
                })
                if (!user)
                    return NextResponse.json({ msg: "Error in Creating user" }, { status: 403 })
                else
                    return NextResponse.json({ msg: "User Created Successfully", user }, { status: 201 })
            }
        }
    }
    catch (e: any) {
        return NextResponse.json({ msg: "Internal Server Error", err: e.message }, { status: 500 })
    }
}
export async function GET(){
    let users = await prisma.user.findMany()
    return NextResponse.json(users)
}