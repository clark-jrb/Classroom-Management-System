import { z } from "zod";

export const studentInfoSchema = z.object({
    firstname: z.string().min(3, { message: "Name should be 3 characters above" }).optional(),
    middlename: z.string().min(2, { message: "Name should be 2 characters above" }).optional(),
    lastname: z.string().min(2, { message: "Name should be 2 characters above" }).optional(),
    email: z.string().email({ message: "Please provide a valid email" }).optional(),
    sex: z.string().optional(),
    contact: z.number(),
})