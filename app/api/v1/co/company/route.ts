import { createCompanySchema } from "@/lib/zod/companySchema";
import { NextRequest,NextResponse} from "next/server";
import prisma from "@/lib/db"

export async function POST(req: NextRequest,{params}:any) {
    try {
        const data = await req.json()
        const parsedData = createCompanySchema.safeParse(data)
        if (!parsedData.success)
            return NextResponse.json({ msg: "Enter correct values", err: parsedData.error.errors }, { status: 400 })
        else {
            const company = await prisma.company.create({
                data: {
                    userId: parsedData.data.userId,
                    name: parsedData.data.name
                }
            })
            return NextResponse.json({ msg: "Company Thing", companyId:company.companyId })
        }
    }catch(e:any){
        return NextResponse.json({msg:"Something Went Wrong",err:e.message},{status:500})
    }
}
// "b16e871a-6e0d-4d2a-9577-f61b050190b3"

