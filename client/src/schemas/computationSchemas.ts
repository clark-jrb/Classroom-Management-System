import { z } from "zod"

export const studentPerformanceSchema = z.object({
    student_performance: z.array(
        z.object({
            sid: z.string(),
            firstname: z.string(),
            lastname: z.string(),
            recitation: z.number(),
            activity: z.number(),
            quiz: z.number(),
            project: z.number(),
            summative: z.number(),
            exam: z.number(),
            // gwa: z.number()
        })
    )
})