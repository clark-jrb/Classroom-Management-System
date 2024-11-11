import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' })
})

export const registerSchema = z.object({
    firstname: z.string().min(2, { message: 'first name should be 2 characters above' }),
    middlename: z.string().min(2, { message: 'middle ame should be 2 characters above' }),
    lastname: z.string().min(2, { message: 'last name should be 2 characters above' }),
    birth_date: z.date({
        required_error: "A date of birth is required.",
    }),
    sex: z.string().min(1, { message: 'Select you gender' }),
    email: z.string().min(1, { message: 'Please provide your email' }),
    password: z.string().min(8, { message: 'Password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' }),
    //for students
    gradeLevel: z.number().min(1, { message: 'Input your grade level' }).optional(),
    // for teachers
    subjects: z.array(
            z.object({
                name: z.string(),
                checked: z.boolean()
            })
        ).refine(
            (subjects) => subjects.some((subject) => subject.checked),
            { message: 'At least one subject must be checked.' }
        ).optional(),
    homeroom: z.boolean().optional()
})