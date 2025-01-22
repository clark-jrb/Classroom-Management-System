import { z } from "zod";
import { studentPerformanceSchema, studentGWASchema } from "@/schemas/computationSchemas";

export type StudentPerformance = z.infer<typeof studentPerformanceSchema>
export type StudentGWA = z.infer<typeof studentGWASchema>