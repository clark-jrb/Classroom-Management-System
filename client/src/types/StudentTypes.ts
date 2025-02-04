import { loginSchema, registerInformationSchema } from "@/schemas/authSchemas"
import { z } from "zod"

export type StudentAccount = {
    _id: string
    role: 'student'
} & Omit<z.infer<typeof loginSchema>, 'role'>

export type StudentProfile = {
    _id: string
    sid: string
} & z.infer<typeof registerInformationSchema>

export type StudentClasses = {
    _id: string
    sid: string
    gradeLevel: string
    section: string
}

export type StudentInformation = {
    account: StudentAccount
    personal: StudentProfile
    classes: StudentClasses
}