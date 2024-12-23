import { loginSchema, registerInformationSchema } from "@/schemas/authSchemas"
import { z } from "zod"

export type TeacherAccount = {
    _id: string
} & z.infer<typeof loginSchema>

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
    subjects: string[]
}

export type TeacherInformation = {
    account: TeacherAccount
    personal: TeacherPersonal
    classes: TeacherClasses
}