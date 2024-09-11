// import { createPaymentSchema } from "@/lib/zod/userSchema";
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db"
// import { getServerSession } from "next-auth";
// import { NEXT_AUTH } from "@/lib/auth";
// export async function POST(req:NextRequest){
//     try{
//         const serverSession = await getServerSession(NEXT_AUTH)
//         if (!serverSession)
//             return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 })
//         const data = await req.json()
//         const parsedData = await createPaymentSchema.safeParse(data)
//         if (!parsedData.success)
//             return NextResponse.json({ msg: "Send correct input values", err: parsedData.error.errors })
//         else
//         {
//             const ticketPrice =await prisma.ticket.findUnique({
//                 where:{
//                     id:parsedData.data.ticket,
//                     userId:serverSession.user.id
//                 },
//                 select:{
//                     bus:{
//                         select:{
//                             price:true
//                         }
//                     }
//                 }
//             })
//             if(!ticketPrice)
//                 return NextResponse.json({msg:"Error finding the ticket price"},{status:404})
//             else
//             {
//                 if(parsedData.data.amount !== ticketPrice.bus.price || !parsedData.data.ticket)
//                     return NextResponse.json({msg:"Paying value not match the correct value"},{status:401})
//                 else
//                 {
//                     const payment = await prisma.payment.create({
//                         data:{
//                             Amount:parsedData.data.amount,
//                             Method:parsedData.data.method,
//                         }
//                     })
//                     if(!payment)
//                         return NextResponse.json({ msg: "Error in creating the payment" }, { status: 403 })
//                     const ticket =await prisma.ticket.update({
//                         where:{
//                             id:parsedData.data.ticket,
//                         },data:{
//                             PaymentId:payment.id,
//                             conformation:"confirmed"
//                         }
//                     })
//                     if(!ticket)
//                         return NextResponse.json({msg:"Error in updating the ticket"},{status:403})
//                     const seat = await prisma.seat.update({
//                         where:{
//                             seatId:ticket.seatId
//                         },
//                         data:{
//                             datesBooked:{
//                                 push:ticket.bookedDate
//                             }
//                         }
//                     })
//                     if (!seat)
//                         return NextResponse.json({ msg: "Error in updating the seats" }, { status: 403 })
//                     return NextResponse.json({msg:"Payment done successfully"},{status:201})
//                 }
//             }

//         }
//     }
//     catch(e:any){
//         return NextResponse.json({msg:"Internal Server Error",err:e.message},{status:500})
//     }
// }