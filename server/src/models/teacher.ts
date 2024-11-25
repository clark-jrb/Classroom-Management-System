import { Schema, model } from "mongoose";

const TeacherSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    role: { type: String, required: true },
})

const TeacherInfoSchema = new Schema({
    tid: { type: Schema.Types.ObjectId, ref: "teachers", required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
})

const TeacherClassSchema = new Schema({
    tid: { type: Schema.Types.ObjectId, ref: "teachers", required: true },
    teacher_role: { type: String, required: true },
    grade_assigned: { type: String, required: true },
    section_handled: { type: [String], required: true },
    subjects: { type: [String], required: true }
})

TeacherInfoSchema.index({ tid: 1 })
TeacherClassSchema.index({ tid: 1 })

export const TeacherModel = model('teachers', TeacherSchema)
export const TeacherInfoModel = model('teachers_info', TeacherInfoSchema)
export const TeacherClassModel = model('teachers_classes', TeacherClassSchema)

