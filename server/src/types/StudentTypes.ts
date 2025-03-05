import { Schema } from "mongoose"
import { GradeLevels } from "./types"

export type StudentClass = {
    sid: Schema.Types.ObjectId
    gradeLevel: GradeLevels
    section: string
}