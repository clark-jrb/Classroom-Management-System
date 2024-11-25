import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

const StudentInfoSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, ref: "students", required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
})

const StudentClassSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, ref: "students", required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
})


StudentInfoSchema.index({ sid: 1 })
StudentClassSchema.index({ sid: 1 })

export const StudentModel = model('students', StudentSchema)
export const StudentInfoModel = model('students_info', StudentInfoSchema)
export const StudentClassModel = model('students_classes', StudentClassSchema)
