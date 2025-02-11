import { z } from "zod";
import { studentPerformanceSchema, studentGWASchema, studentGASchema } from "@/schemas/computationSchemas";
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
    _id: string
    sid: {
        sid: string
        firstname: string
        lastname: string
    }
    section: string
    quarter: QuarterTypes;
    gradeLevel: string
    math: number
    science: number
    filipino: number
    hekasi: number
    english: number
    mapeh: number
    gpa: number
}

export type StudentCalculatedGPA = {
    sid: string
    firstname: string
    lastname: string
    gpa: {
        math: number
        science: number
        filipino: number
        hekasi: number
        english: number
        mapeh: number
    }
}

export type StudentGA = z.infer<typeof studentGASchema>