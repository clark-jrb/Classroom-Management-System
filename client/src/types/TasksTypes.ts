import { studentScoreSchema, taskSchema } from "@/schemas/teacherSchemas"
import { z } from "zod"

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

export type StudentTakingTask = {
    _id: string
    score: number,
    sid: string
    task_id: TTasks
}

export type StudentTaskCreate = {
    task_id: string
    grade_lvl: string
    section: string
}

export type TTaskForm = z.infer<typeof taskSchema>

export type TTasks = TTaskForm & {
    _id: string
    tid: string
}

export type TUpdateTask = {
    total_items: number
    subject: string
    task_no: number
}

export type StudentScore = z.infer<typeof studentScoreSchema>
