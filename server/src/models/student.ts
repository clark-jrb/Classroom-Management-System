import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
    // firstname: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    // gradeLevel: { type: Number, required: true }
})

export const StudentModel = model('students', StudentSchema)

const StudentInfoSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    middlename: { type: String, required: false, default: '' },
    lastname: { type: String, required: true, default: '' },
    sex: { type: String, required: true, default: '' },
    birthdate: { type: Date, required: false, default: null },
    contact: { type: Number, required: true, default: null }
})

export const StudentInfoModel = model('students_info', StudentInfoSchema)
