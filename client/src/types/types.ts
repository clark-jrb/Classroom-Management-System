import { studentScoreSchema, taskSchema } from "@/schemas/teacherSchemas"
import { z } from "zod"

export type AllString = {
    [key: string]: string
}

export type StudentTask = {
    _id: string
    score: number,
    sid: {
        [key: string]: string
    },
    task_id: {
        total_items: number
    }
}

export type StudentTaskCreate = {
    task_id: string
    grade_lvl: string
    section: string
}

export type StudentScore = z.infer<typeof studentScoreSchema>
export type TTaskForm = z.infer<typeof taskSchema>

export type TTasks = TTaskForm & {
    _id: string
    tid: string
}

export type Message = {
    message: string
}