import { createBusSchema, getBusSchema } from "@/lib/zod/companySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
export async function POST(req: NextRequest) {
    try {
        const serverSession = await getServerSession({req,...NEXT_AUTH})
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
        if(serverSession.user.role == "user")
            return NextResponse.json({ msg: "your not a company owner", err: "Access denied" }, { status: 403 })
        const companyId = req.headers.get("companyId");
        const data = await req.json()
        data.companyId = companyId
        const parsedData = createBusSchema.safeParse(data)
        if (!parsedData.success)
            return NextResponse.json({ msg: "Enter valid Data", err: parsedData.error.errors }, { status: 400 })
        else {
            const company = await prisma.company.update({
                where: {
                    companyId: parsedData.data.companyId,
                    userId:serverSession.user.id
                },
                data: {
                    bus: {
                        create: {
                            busNumber: parsedData.data.busNumber,
                            departureTime: parsedData.data.departureTime,
                            journeyTime: parsedData.data.journeyTime,
                            destination: parsedData.data.destination,
                            from: parsedData.data.from,
                            price: parsedData.data.price,
                        }
                    }
                }, include: {
                    bus: true
                }
            })
            if (!company)
                return NextResponse.json({ msg: "Something went wrong while adding Bus" }, { status: 400 })
            else
                return NextResponse.json({ msg: "Bus created successfully", busId: company.bus })
        }
    } catch (e: any) {
        return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
    }
}

// export async function GET(req: NextRequest) {
//     try {
//         const serverSession = await getServerSession({req,...NEXT_AUTH})
//         console.log(serverSession)
//         if (!serverSession)
//             return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
//         if (serverSession.user.role == "user")
//             return NextResponse.json({ msg: "your not a company owner", err: "Access denied" }, { status: 403 })
//         const companyId  = req.headers.get("companyId")
//         const busId = req.headers.get("busId")
//         const parsedData = getBusSchema.safeParse({companyId,busId})
//         if (!parsedData.success)
//             return NextResponse.json({ msg: "Enter valid Data", err: parsedData.error.errors }, { status: 400 })
//         else
//         {
//             if(!parsedData.data.busId)
//             {
//                 const buses = await prisma.bus.findMany({
//                     where: {
//                         companyId: parsedData.data.companyId,
//                         comapny:{
//                             userId:serverSession.user.id
//                         }
//                     }
//                 })
//                 if (!buses)
//                     return NextResponse.json({ msg: "Buses not found" }, { status: 404 })
//                 else
//                     return NextResponse.json({ msg: "All buses of company", buses })
//             }
//             else
//             {
//                 const buses = await prisma.bus.findUnique({
//                     where: {
//                         companyId: parsedData.data.companyId,
//                         busId:parsedData.data.busId,
//                         comapny: {
//                             userId: serverSession.user.id
//                         }
//                     },include:{
//                         seats:true
//                     }
//                 })
//                 if (!buses)
//                     return NextResponse.json({ msg: "Buse not found" }, { status: 404 })
//                 else
//                     return NextResponse.json({ msg: "successfully got bus", buses })
//             }
            
//         }

//     } catch (e: any) {
//         return NextResponse.json({ msg: "Something went wrong", err: e.message }, { status: 500 })
//     }
// }
