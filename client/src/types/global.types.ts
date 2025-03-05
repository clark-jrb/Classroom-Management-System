import { TeacherAuthenticated } from "./teacher.types"
import { StudentAccount } from "./student.types"

export type Roles = "student" | "faculty" | "admin"

export type QuarterTypes = 'q1'| 'q2' | 'q3' | 'q4'

export type TaskTypes = 'recitation' | 'quiz' | 'activity' | 'project' | 'summative' | 'exam'

export type SubjectTypes = 'math'| 'science' | 'english' | 'hekasi' | 'filipino' | 'mapeh'

export type GradeLevels = 'grade_1' | 'grade_2' | 'grade_3' | 'grade_4' | 'grade_5' | 'grade_6'

export type CurrentQuarter = {
    _id: string
    current_quarter: QuarterTypes
}

export type CurrentUser = {
    currentUser: TeacherAuthenticated | StudentAccount
    accessToken: string
}

export type Message = {
    message: string
}