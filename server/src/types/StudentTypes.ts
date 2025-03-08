import { Schema } from "mongoose"
import { GradeLevels } from "./GlobalTypes"

export type StudentClass = {
    sid: Schema.Types.ObjectId
    gradeLevel: GradeLevels
    section: string
}