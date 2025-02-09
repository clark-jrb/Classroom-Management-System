import { Schema, model } from "mongoose";

const GWASchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    gwa: { type: Number, required: true, default: 0 }
})

// GWASchema.index({ section: 1, subject: 1 })

const GPASchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
    math: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    mapeh: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    filipino: { type: Number, default: 0 },
    hekasi: { type: Number, default: 0 },
    gpa: { type: Number, default: 0 }
})

GPASchema.index({ section: 1 })

export const GWAModel = model('students_gwa', GWASchema)
export const GPAModel = model('students_gpa', GPASchema)