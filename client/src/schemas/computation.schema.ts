import { z } from "zod"

export const StudentPerformanceSchema = z.object({
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
            average: z.number()
        })
    )
})

export const StudentSGSchema = z.object({
    student_sg: z.array(
        z.object({
            sid: z.string(),
            section: z.string(),
            subject: z.string(),
            subj_grade: z.number(),
            quarter: z.string()
        })
    )
})

export const StudentGASchema = z.object({
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
            general_ave: z.number()
        })
    )
})