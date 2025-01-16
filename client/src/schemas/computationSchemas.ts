import { z } from "zod"

export const studentPerformanceSchema = z.object({
    student_performance: z.array(
        z.object({
            _id: z.string(),
            sid: z.string(),
            quarter: z.string(),
            gradeLevel: z.string(),
            section: z.string(),
            subject: z.string(),
            recitation: z.number(),
            activity: z.number(),
            quiz: z.number(),
            project: z.number(),
            summative: z.number(),
            exam: z.number(),
            gwa: z.number()
        })
    )
})