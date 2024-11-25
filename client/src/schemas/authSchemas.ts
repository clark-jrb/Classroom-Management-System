import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' })
})

export const registerAccountSchema = z.object({
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'Role is required' })
})

export const registerInformationSchema = z.object({
    firstname: z.string().min(2, { message: 'first name should be 2 characters above' }),
    middlename: z.string().min(2, { message: 'middle ame should be 2 characters above' }),
    lastname: z.string().min(2, { message: 'last name should be 2 characters above' }),
    sex: z.string().min(1, { message: 'Select you gender' }),
    birth_date: z.date({ required_error: "A date of birth is required." }),
    contact: z.string().min(11, { message: 'contact number contains of 11 characters' }),
})

export const registerClassesSchema = z.object({
    //for students
    gradeLevel: z.string().min(1, { message: 'Choose your grade level' }).optional(),
    section: z.string().min(1, { message: 'Select your section you are enrolled' }).optional(),
    // for teachers
    teacher_role: z.string().min(1, { message: 'Select you role' }).optional(),
    grade_assigned: z.string().min(1, { message: 'Choose section handled' }).optional(),
    section_handled: z.array(z.string()).min(1, { message: 'Subjects should not be empty' }).optional(),
    subjects: z.array(z.string()).min(1, { message: 'Subjects should not be empty' }).optional(),
})