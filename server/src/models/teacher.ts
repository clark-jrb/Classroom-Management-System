import { Schema, model } from "mongoose";
import { IUser } from "./user";

interface ITeacher extends IUser {
    subject: string
}

const TeacherSchema = new Schema<ITeacher>({
    firstname: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    role: { type: String, required: true },
    subject: { type: String, required: true }
})

export const TeacherModel = model<ITeacher>('teachers', TeacherSchema)

