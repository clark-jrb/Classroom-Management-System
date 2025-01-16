import mongoose from "mongoose"

export interface UserAccount {
    email: string
    password: string
    role: string
}

export interface UserProfile {
    firstname: string
    middlename: string
    lastname: string
    birth_date: Date
    sex: string
    contact: string
}