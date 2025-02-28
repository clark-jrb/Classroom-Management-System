import { z } from "zod"

export const userAccountSchema = z.object({
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' })
})

export const userProfileSchema = z.object({
    firstname: z.string().min(2, { message: 'First name should be 2 characters above' }),
    middlename: z.string().min(2, { message: 'Middle name should be 2 characters above' }),
    lastname: z.string().min(2, { message: 'Last name should be 2 characters above' }),
    sex: z.string().min(1, { message: 'Select you gender' }),
    birth_date: z.date({ 
        required_error: "A date of birth is required." 
    }),
    contact: z.string().min(11, { message: 'Contact number must be 11 digits' }),
})

export const userClassesSchema = z.object({
    //for students
    gradeLevel: z.string().min(1, { message: 'Choose your grade level' }).optional(),
    section: z.string().min(1, { message: 'Select your section you are enrolled' }).optional(),
    // for teachers
    teacher_role: z.string().min(1, { message: 'Select you role' }).optional(),
    grade_assigned: z.string().min(1, { message: 'Choose section handled' }).optional(),
    section_handled: z.array(z.string()).min(1, { message: 'Subjects should not be empty' }).optional(),
    subjects: z.array(z.string()).min(1, { message: 'Subjects should not be empty' }).optional(),
})