import { z } from "zod"

export const currentQuarterSchema = z.object({
    current_quarter: z.string()
})