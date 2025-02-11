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

export const studentGWASchema = z.object({
    student_gwa: z.array(
        z.object({
            sid: z.string(),
            section: z.string(),
            subject: z.string(),
            gwa: z.number(),
            quarter: z.string()
        })
    )
})

export const studentGASchema = z.object({
    student_ga: z.array(
        z.object({
            sid: z.string(),
            section: z.string(),
            grade_level: z.string(),
            math: z.number(),
            science: z.number(),
            filipino: z.number(),
            hekasi: z.number(),
            english: z.number(),
            mapeh: z.number(),
            ga: z.number()
        })
    )
})