import { z } from "zod";
import { studentPerformanceSchema } from "@/schemas/computationSchemas";

export type StudentPerformance = z.infer<typeof studentPerformanceSchema>