import { z } from "zod"
import { SubjectTypes } from "./global.types"
import { userAccountSchema, userProfileSchema } from "@/schemas/user.schema"

export type TeacherAccount = {
    _id: string
    role: 'faculty'
} & Omit<z.infer<typeof userAccountSchema>, 'role'>

export type TeacherRole = "homeroom" | "subject"

export type TeacherProfile = {
    _id: string
    tid: string
} & z.infer<typeof userProfileSchema>

export type TeacherClasses = {
    _id: string
    tid: string
    teacher_role: TeacherRole
    grade_assigned: string
    section_handled: string[]
    subjects: SubjectTypes[]
}

export type TeacherInformation = {
    account: TeacherAccount
    profile: TeacherProfile
    classes: TeacherClasses
}

export type TeacherData = TeacherAccount & TeacherProfile & TeacherClasses

export type TeacherAuthenticated = {
    details: TeacherClasses
} & TeacherAccount

export type MyStudents = {
    _id: string
    sid: {
        sid: string
        firstname: string
        middlename: string
        lastname: string
        sex: string
        birth_date: Date
        contact: string
    },
    gradeLevel: string
    section: string
}