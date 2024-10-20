import { Schema, model } from "mongoose";
import { IUser } from "./user";

interface ISubjects {
    name: string
    checked: boolean
}

interface ITeacher extends IUser {
    subjects: ISubjects[]
}

const TeacherSchema = new Schema<ITeacher>({
    firstname: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    role: { type: String, required: true },
    subjects: { type: [Object], required: true }
})

export const TeacherModel = model<ITeacher>('teachers', TeacherSchema)

