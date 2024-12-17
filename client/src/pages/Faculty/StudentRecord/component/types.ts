import { studentScoreSchema } from "@/schemas/teacherSchemas"
import { z } from "zod"

export type AllString = {
    [key: string]: string
}

type Task = {
    total_items: number
}

type StudentInfo = {
    sid: string,
    firstname: string,
    lastname: string
}

export type StudentTask = {
    _id: string
    score: number,
    sid: StudentInfo,
    task_id: Task
}

export type StudentScore = z.infer<typeof studentScoreSchema>