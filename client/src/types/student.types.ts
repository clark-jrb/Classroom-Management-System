import { userAccountSchema, userProfileSchema } from "@/schemas/user.schema"
import { z } from "zod"

export type StudentAccount = {
    _id: string
    role: 'student'
} & Omit<z.infer<typeof userAccountSchema>, 'role'>

export type StudentProfile = z.infer<typeof userProfileSchema>

export type StudentClasses = {
    gradeLevel: string
    section: string
}

export type StudentInformation = {
    account: StudentAccount
    profile: StudentProfile
    classes: StudentClasses
}