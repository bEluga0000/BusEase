import { createCompanySchema, getCompanySchema } from "@/lib/zod/companySchema";
import { NextRequest,NextResponse} from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        // const serverSession = await getServerSession(NEXT_AUTH)
        // if (!serverSession)
        //     return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        // if (serverSession.user.role == "user")
        //     return NextResponse.json({ msg: "your not a company owner", err: "Access denied" }, { status: 403 })
        const data = await req.json()
        // data.userId = serverSession.user.id
        data.userId = await req.headers.get("userId")
        const parsedData = createCompanySchema.safeParse(data)
        if (!parsedData.success)
            return NextResponse.json({ msg: "Enter correct values", err: parsedData.error.errors }, { status: 400 })
        else {
            const company = await prisma.company.create({
                data: {
                    userId: parsedData.data.userId,
                    name: parsedData.data.name
                },include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            return NextResponse.json({ msg: "Company Thing", companyId:company.companyId })
        }
    }catch(e:any){
        return NextResponse.json({msg:"Something Went Wrong",err:e.message},{status:500})
    }
}
// "b16e871a-6e0d-4d2a-9577-f61b050190b3"

// once we add all the user schema we need to return user details
export async function GET(req: NextRequest) {
    try {
        const serverSession = await getServerSession(NEXT_AUTH)
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        if (serverSession.user.role == "user")
            return NextResponse.json({ msg: "your not a company owner", err: "Access denied" }, { status: 403 })
        const companyId  = req.headers.get("companyId")
        const parsedData = getCompanySchema.safeParse({companyId})
        if (!parsedData.success)
            return NextResponse.json({ msg: "Enter correct values", err: parsedData.error.errors }, { status: 400 })
        else
        {
            const company = await prisma.company.findUnique({
                where: {
                    companyId:parsedData.data.companyId,
                    userId:serverSession.user.id
                },include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            if (!company)
                return NextResponse.json({ msg: "Company not found" }, { status: 404 })
            else
                return NextResponse.json({ msg: "company found", company }, { status: 201 })
        }

    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}
