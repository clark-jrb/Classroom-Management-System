import { ValidRoles } from '../types/types'

export type UserAccount = {
    email: string
    password: string
    role: ValidRoles
}

export type UserProfile = {
    firstname: string
    middlename: string
    lastname: string
    birth_date: Date
    sex: string
    contact: string
}