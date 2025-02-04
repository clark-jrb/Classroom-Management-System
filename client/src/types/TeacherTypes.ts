import { loginSchema, registerInformationSchema } from "@/schemas/authSchemas"
import { z } from "zod"
import { SubjectTypes } from "./types"

export type TeacherAccount = {
    _id: string
    // role: 'faculty'
} & Omit<z.infer<typeof loginSchema>, 'role'>

export type TeacherPersonal = {
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
    personal: TeacherPersonal
    classes: TeacherClasses
}

export type TeacherAuthenticated = {
    details: TeacherClasses
    role: 'faculty'
} & TeacherAccount