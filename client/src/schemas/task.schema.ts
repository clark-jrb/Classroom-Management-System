import { z } from "zod"

export const taskSchema = z.object({
    subject: z.string().min(1, { message: "This is required" }),
    grade: z.string().min(1, { message: "This is required" }),
    section: z.string().min(1, { message: "This is required" }),
    type: z.string().min(1, { message: "This is required" }),
    task_no: z.number().min(1).max(10),
    total_items: z.number().min(5).max(100),
    quarter: z.string().min(1, { message: "This is required" }),
})

export const updateTaskSchema = z.object({
    subject: z.string().min(1, { message: "This is required" }),
    task_no: z.number().min(1).max(10),
    total_items: z.number().min(5).max(100)
})

export const studentScoreSchema = z.object({
    student_scores: z.array(
        z.object({
            _id: z.string(),
            score: z.number().min(0),
        })
    )
})
