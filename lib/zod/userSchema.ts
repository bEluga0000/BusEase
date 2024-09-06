import { z } from "zod";

export const createUserSchema = z.object({
    id:z.string(),
    name:z.string(),
    email:z.string().email(),
    image:z.string(),
})

export const createTicketSchema = z.object({
    userId:z.string(),
    bookedDate:z.string(),
    seatId:z.string(),
    busId:z.string()
})

export const createPaymentSchema = z.object({
    ticket:z.string(),
    method: z.enum(["upi", "debit", "credit"]).refine((val) => ["upi", "debit", "credit"].includes(val), {
        message: "You can only add the string `upi` or `debit` or `credit`",
    }),
    amount:z.number()
})
export const getUserBusSchema = z.object({
    from: z.string(),
    to: z.string()
})
// model Payment{
//   id String @id @default (uuid())
//   Amount Int
//   Method Methods
//   ticket Ticket ?
// }