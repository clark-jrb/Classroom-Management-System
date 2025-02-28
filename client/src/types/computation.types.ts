import { z } from "zod"
import { StudentPerformanceSchema, StudentSGSchema, StudentGASchema } from "@/schemas/computation.schema"
import { QuarterTypes, SubjectTypes } from "./global.types"

export type StudentPerformance = z.infer<typeof StudentPerformanceSchema>
export type StudentSG = z.infer<typeof StudentSGSchema>
export type StudentSGWithProfile = {
    sid: {
        sid: string
        firstname: string
        lastname: string
    }
    section: string
    subject: string
    subj_grade: number
    quarter: string
}[]

export type StudentSGFilter = {
    section: string
    subject: SubjectTypes
    // quarter: QuarterTypes
}

export type StudentQA = {
    _id: string
    sid: {
        sid: string
        firstname: string
        lastname: string
    }
    section: string
    quarter: QuarterTypes
    gradeLevel: string
    math: number
    science: number
    filipino: number
    hekasi: number
    english: number
    mapeh: number
    // quarter_ave: number
}

export type StudentCalculatedQA = {
    sid: string
    firstname: string
    lastname: string
    total_qa: {
        math: number
        science: number
        filipino: number
        hekasi: number
        english: number
        mapeh: number
    }
}

export type StudentGA = z.infer<typeof StudentGASchema>

export type StudentGeneralAverage = {
    sid: string
    grade_level: string
    section: string
    math: number
    science: number
    mapeh: number
    english: number
    filipino: number
    hekasi: number
    general_ave: number
}