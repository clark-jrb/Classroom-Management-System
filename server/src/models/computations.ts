import { Schema, model } from "mongoose";

const SubjectGradeSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    subj_grade: { type: Number, required: true, default: 0 }
})

// SubjectGradeSchema.index({ section: 1, subject: 1 })

const QuarterlyAverageSchema = new Schema({
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
    quarter_ave: { type: Number, default: 0 }
})

const GeneralAverageSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    grade_level: { type: String, required: true },
    section: { type: String, required: true },
    math: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    mapeh: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    filipino: { type: Number, default: 0 },
    hekasi: { type: Number, default: 0 },
    general_ave: { type: Number, default: 0 }
})

QuarterlyAverageSchema.index({ section: 1 })
GeneralAverageSchema.index({ section: 1 })

export const SubjectGradeModel = model('students_sgs', SubjectGradeSchema)
export const QuarterlyAverageModel = model('students_qas', QuarterlyAverageSchema)
export const GeneralAverageModel = model('students_gas', GeneralAverageSchema)

// sgs = subject grade(s)
// qas = quarterly average(s)
// gas = general average(s)