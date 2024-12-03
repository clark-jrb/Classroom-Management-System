import { z } from "zod";

export const taskSchema = z.object({
    subject: z.string().min(1, { message: "this is reqquired" }),
    grade: z.string().min(1, { message: "this is reqquired" }),
    section: z.string().min(1, { message: "this is reqquired" }),
    type: z.string().min(1, { message: "this is reqquired" }),
    task_no: z.number().min(1).max(10),
    total_items: z.number().min(5).max(100),
    quarter: z.string().min(1, { message: "this is reqquired" }),
})