import { loginSchema, registerInformationSchema } from "@/schemas/authSchemas"
import { z } from "zod"
import { SubjectTypes } from "./GlobalTypes"

export type TeacherAccount = {
    _id: string
    role: 'faculty'
} & Omit<z.infer<typeof loginSchema>, 'role'>

export type TeacherProfile = {
    _id: string
    tid: string
} & z.infer<typeof registerInformationSchema>

export type TeacherClasses = {
    _id: string
    tid: string
    teacher_role: string
    grade_assigned: string
    section_handled: string[]
    subjects: SubjectTypes[]
}

export type TeacherInformation = {
    account: TeacherAccount
    profile: TeacherProfile
    classes: TeacherClasses
}

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