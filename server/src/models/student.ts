import { Schema, model } from "mongoose";
import { IUser } from "./user";

interface IStudent extends IUser {
    gradeLevel: number
}

const StudentSchema = new Schema<IStudent>({
    firstname: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    gradeLevel: { type: Number, required: true }
})

export const StudentModel = model<IStudent>('students', StudentSchema)
