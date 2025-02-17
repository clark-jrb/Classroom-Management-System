import mongoose from "mongoose"

export type TaskTypes = "recitation" | 'quiz' | 'activity' | 'project' | 'summative' | 'exam'

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

export type Task = {
    tid: mongoose.Types.ObjectId
    subject: string
    grade: string
    section: string
    type: string
    task_no: number
    total_items: number
    quarter: string
}

export type PopulatedST = {
    sid: mongoose.Types.ObjectId
    task_id: Task
    score: number
}

export type StudentsSubjectGrade = {
    sid: string
    section: string
    subject: string
    subj_grade: number
    quarter: string
}