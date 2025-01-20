import { z } from "zod";
import { studentPerformanceSchema } from "@/schemas/computationSchemas";

export type StudentPerformance = z.infer<typeof studentPerformanceSchema>

export type StudentPerfo = {
    sid: string
    firstname: string
    lastname: string
    recitation: number
    activity: number
    quiz: number
    project: number
    summative: number
    exam: number
}