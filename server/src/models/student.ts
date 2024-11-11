import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

export const StudentModel = model('students', StudentSchema)

const StudentInfoSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true , unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false, default: '' },
    lastname: { type: String, required: true, default: '' },
    sex: { type: String, required: true, default: '' },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
    gradeLevel: { type: Number, required: true }
})

export const StudentInfoModel = model('students_info', StudentInfoSchema)
