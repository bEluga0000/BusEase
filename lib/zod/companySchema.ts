import { z } from "zod"
export const createCompanySchema = z.object({
    name: z.string().min(2, "Enter the minimum 2 character name"),
    userId: z.string(),
})
// departureTime: "14:30"  or "2024-08-17T14:30:00Z" if using ISO format
// KA-04-EA-2024 bus nuber
export const createBusSchema = z.object({
    busNumber: z.string().regex(/^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/, "Invalid bus number format"),
    from: z.string(),
    destination: z.string(),
    departureTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    journeyTime:z.number(),
    price: z.number(),
    companyId: z.string()
})
// odds or ws and evens are ms
export const createSeatsSchema =z.object({
    seats:z.array(
        z.object({
            position: z.enum(["ws", "ms"]).refine((val) => ["ws", "ms"].includes(val), {
                message: "You can only add the string 'ws' or 'ms'",
            }),
            seatNo: z.number(),
        })
    )
})
export const getBusSchema = z.object({
    companyId:z.string(),
    busId:z.string().nullable().optional()
})
export const getCompanySchema = z.object({
    companyId:z.string()
})

