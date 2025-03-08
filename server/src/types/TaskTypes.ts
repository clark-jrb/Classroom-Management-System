import mongoose from "mongoose"

export type TaskTypes = 'recitation' | 'quiz' | 'activity' | 'project' | 'summative' | 'exam'

export type Task = {
    tid: string
    subject: string
    grade: string
    section: string
    type: string
    task_no: number
    total_items: number
    quarter: string
}

export type StudentTask = {
    sid: mongoose.Types.ObjectId
    task_id: mongoose.Types.ObjectId
    score: number
}

export type StudentTaskScore = {
    _id: mongoose.Types.ObjectId
    sid: mongoose.Types.ObjectId
    score: number
}

export type StudentSubjectGrade = {
    sid: string
    section: string
    subject: string
    subj_grade: number
    quarter: string
}

export type TUpdateTask = {
    total_items: number
    subject: string
    task_no: number
}