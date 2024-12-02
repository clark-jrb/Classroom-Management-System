import { z } from "zod";

export const studentPersonalSchema = z.object({
    firstname: z.string().min(2, { message: 'first name should be 2 characters above' }),
    middlename: z.string().min(2, { message: 'middle ame should be 2 characters above' }),
    lastname: z.string().min(2, { message: 'last name should be 2 characters above' }),
    sex: z.string().min(1, { message: 'Select you gender' }),
    contact: z.string().min(11, { message: 'contact number contains of 11 characters' }),
    birth_date: z.date({
        required_error: "A date of birth is required.",
    })
})