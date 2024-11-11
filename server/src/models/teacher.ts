import { Schema, model } from "mongoose";

const TeacherSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    role: { type: String, required: true },
})

const TeacherInfoSchema = new Schema({
    email: { type: String, required: true , unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
    subjects: { type: [Object], required: true },
    homeroom: { type: Boolean, required: true }
})

export const TeacherModel = model('teachers', TeacherSchema)
export const TeacherInfoModel = model('teachers_info', TeacherInfoSchema)

