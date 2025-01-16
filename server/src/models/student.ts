import { Schema, model } from "mongoose";

const StudentAccountSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

const StudentPersonalSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, ref: "students_accounts", required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
})

const StudentClassSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, ref: "students_accounts", required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
})


StudentPersonalSchema.index({ sid: 1 })
StudentClassSchema.index({ sid: 1 })

export const StudentAccountModel = model('students_accounts', StudentAccountSchema)
export const StudentPersonalModel = model('students_personals', StudentPersonalSchema)
export const StudentClassModel = model('students_class', StudentClassSchema)
