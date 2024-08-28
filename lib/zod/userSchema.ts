import { z } from "zod";

export const createUserSchema = z.object({
    id:z.string(),
    name:z.string(),
    email:z.string().email(),
    image:z.string()
})
