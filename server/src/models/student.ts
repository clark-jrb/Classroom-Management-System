import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

const StudentInfoSchema = new Schema({
    email: { type: String, required: true , unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
    gradeLevel: { type: Number, required: true }
})

export const StudentModel = model('students', StudentSchema)
export const StudentInfoModel = model('students_info', StudentInfoSchema)
