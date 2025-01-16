import mongoose, { mongo } from "mongoose"
import { UserAccount, UserProfile } from "./UserTypes"

export interface StudentAccount extends UserAccount {
    sid: mongoose.Types.ObjectId
}

export interface StudentProfile extends UserProfile {
    sid: mongoose.Types.ObjectId
}

export interface StudentClass {
    sid: mongoose.Types.ObjectId
    gradeLevel: string
    section: string
}