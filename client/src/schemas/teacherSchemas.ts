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

export const studentScoreSchema = z.object({
    student_scores: z.array(
        z.object({
            _id: z.string(),
            sid: z.string(),
            score: z.number().min(0),
        })
    )
})
