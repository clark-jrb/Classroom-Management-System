import mongoose from "mongoose";
import { UserAccount, UserProfile } from "./UserTypes";

export interface TeacherAccount extends UserAccount {
    tid: mongoose.Types.ObjectId
}

export interface TeacherProfile extends UserProfile {
    tid: mongoose.Types.ObjectId
}

export interface TeacherClass {
    tid: mongoose.Types.ObjectId
    teacher_role: string
    grade_assigned: string
    section_handled: string[]
    subjects: string[]
}