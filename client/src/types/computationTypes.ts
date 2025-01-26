import { z } from "zod";
import { studentPerformanceSchema, studentGWASchema } from "@/schemas/computationSchemas";
import { SubjectTypes } from "./types";

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