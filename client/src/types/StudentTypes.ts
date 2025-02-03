import { loginSchema, registerInformationSchema } from "@/schemas/authSchemas"
import { z } from "zod"

export type StudentAccount = {
    _id: string
} & z.infer<typeof loginSchema>

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