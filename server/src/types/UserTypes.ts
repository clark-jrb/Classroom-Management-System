import mongoose from 'mongoose'
import { ValidRoles } from './GlobalTypes'

export type UserAccount = {
    email: string
    password: string
    role: ValidRoles
}

export type UserProfile = {
    sid: mongoose.Types.ObjectId
    tid: mongoose.Types.ObjectId
    firstname: string
    middlename: string
    lastname: string
    birth_date: Date
    sex: string
    contact: string
}