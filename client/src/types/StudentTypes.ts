import { loginSchema, registerInformationSchema } from "@/schemas/authSchemas"
import { z } from "zod"

export type StudentAccount = {
    _id: string
    role: 'student'
} & Omit<z.infer<typeof loginSchema>, 'role'>

export type StudentProfile = z.infer<typeof registerInformationSchema>

export type StudentClasses = {
    gradeLevel: string
    section: string
}

export type StudentInformation = {
    account: StudentAccount
    profile: StudentProfile
    classes: StudentClasses
}