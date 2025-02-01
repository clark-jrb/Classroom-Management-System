import { z } from "zod";
import { studentPerformanceSchema, studentGWASchema } from "@/schemas/computationSchemas";
import { QuarterTypes, SubjectTypes } from "./types";

export type StudentPerformance = z.infer<typeof studentPerformanceSchema>
export type StudentGWA = z.infer<typeof studentGWASchema>
export type StudentGWAWithProfile = {
    sid: {
        sid: string
        firstname: string
        lastname: string
    }
    section: string;
    subject: string;
    gwa: number;
    quarter: string;
}[];

export type StudentGWAFilter = {
    section: string
    subject: SubjectTypes
    // quarter: QuarterTypes
}

export type StudentGPA = {
    sid: string
    quarter: QuarterTypes
    gradeLevel: string
    section: string
    math: number
    science: number
    filipino: number
    hekasi: number
    english: number
    mapeh: number
    gpa: number
}