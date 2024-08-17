import { createBusSchema} from "@/lib/zod/companySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
export async function POST(req:NextRequest) {
    try{
        const data = await req.json()
        const parsedData = createBusSchema.safeParse(data)
        if(!parsedData.success)
            return NextResponse.json({msg:"Enter valid Data",err:parsedData.error.errors},{status:400})
        else{
            const company = await prisma.company.update({
                where:{
                    companyId: parsedData.data.companyId
                },
                data:{
                    bus:{
                        create:{
                            busNumber: parsedData.data.busNumber,
                            departureTime: parsedData.data.departureTime,
                            reachTime: parsedData.data.reachTime,
                            destination: parsedData.data.destination,
                            from: parsedData.data.from,
                            price: parsedData.data.price,
                        }
                    }
                },include:{
                    bus:true
                }
            })
            if(!company)
                return NextResponse.json({msg:"Something went wrong while adding Bus"},{status:400})
            else
                return NextResponse.json({msg:"Bus found successfully",busId:company.bus})
        }
    }catch(e:any){
        return NextResponse.json({msg:"Something went wrong",err:e.message},{status:500})
    }
}
