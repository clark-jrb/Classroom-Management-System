import { Schema, model } from "mongoose";

const GWASchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    recitation: { type: Number, required: true },
    activity: { type: Number, required: true },
    quiz: { type: Number, required: true },
    project: { type: Number, required: true },
    summative: { type: Number, required: true },
    exam: { type: Number, required: true },
    gwa: { type: Number, required: true }
})

GWASchema.index({ gradeLevel: 1, subject: 1 })

const GPASchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
    math: { type: Number, required: true },
    science: { type: Number, required: true },
    mapeh: { type: Number, required: true },
    english: { type: Number, required: true },
    filipino: { type: Number, required: true },
    hekasi: { type: Number, required: true },
    gpa: { type: Number, required: true }
})

export const GWAModel = model('students_gwa', GWASchema)
export const GPAModel = model('students_gpa', GPASchema)