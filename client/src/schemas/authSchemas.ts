import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' })
})

export const registerSchema = z.object({
    // firstname: z.string().min(3, { message: 'Name should be 3 characters above' }),
    email: z.string().min(1, { message: 'Please provide your email' }),
    password: z.string().min(8, { message: 'Password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' }),
    // gradeLevel: z.number().min(1, { message: 'Input your grade level' }).optional(),
    // subjects: z.array(
    //     z.object({
    //         name: z.string(),
    //         checked: z.boolean()
    //     })
    // ).refine(
    //     (subjects) => subjects.some((subject) => subject.checked),
    //     { message: 'At least one subject must be checked.' }
    // ).optional(),
    // homeroom: z.boolean().default(false).optional()
})