import { Schema, model } from "mongoose";

const TeacherAccountSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    role: { type: String, required: true },
})

const TeacherPersonalSchema = new Schema({
    tid: { type: Schema.Types.ObjectId, ref: "teachers_accounts", required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
})

const TeacherClassSchema = new Schema({
    tid: { type: Schema.Types.ObjectId, ref: "teachers_accounts", required: true },
    teacher_role: { type: String, required: true },
    grade_assigned: { type: String, required: true },
    section_handled: { type: [String], required: true },
    subjects: { type: [String], required: true }
})

TeacherPersonalSchema.index({ tid: 1 })
TeacherClassSchema.index({ tid: 1 })

TeacherAccountSchema.virtual("details", {
    ref: "teachers_class",
    localField: "_id",
    foreignField: "tid",
    justOne: true
})

TeacherAccountSchema.set("toJSON", { virtuals: true })
TeacherAccountSchema.set("toObject", { virtuals: true })

export const TeacherAccountModel = model('teachers_accounts', TeacherAccountSchema)
export const TeacherPersonalModel = model('teachers_personals', TeacherPersonalSchema)
export const TeacherClassModel = model('teachers_class', TeacherClassSchema)

