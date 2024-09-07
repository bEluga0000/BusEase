import { NEXT_AUTH } from "@/lib/auth";
import { getRazorOrderSchema } from "@/lib/zod/userSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"
const razorPay = new Razorpay({
    key_id: process.env.NEXT_TEST_RAZORY_KEY ? process.env.NEXT_TEST_RAZORY_KEY : "",
    key_secret: process.env.NEXT_TEST_RAZORY_SECRET
})
export async function POST(req:NextRequest){
    try{
        const serverSession = await getServerSession(NEXT_AUTH);
        if (!serverSession)
            return NextResponse.json({ msg: "Please Login before hitting this request", err: "Access denied" }, { status: 403 });
        const data = await req.json()
        const parsedData = await getRazorOrderSchema.safeParse(data);
        if (!parsedData.success)
            return NextResponse.json({ msg: "Send correct input values", err: parsedData.error.errors }, { status: 400 });
        const order = await razorPay.orders.create(parsedData.data)
        if (!order)
            return NextResponse.json({ msg: "order not generated" }, { status: 401 })
        return NextResponse.json({ msg: "order created", order }, { status: 201 })
    } catch (e: any) {
        return NextResponse.json({ msg: "Internal server Error", err: e.message }, { status: 500 });
    }
}