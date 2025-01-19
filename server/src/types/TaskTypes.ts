import mongoose from "mongoose"

export type TaskTypes = "recitation" | 'quiz' | 'activity' | 'project' | 'summative' | 'exam'

export type StudentTask = {
    _id: mongoose.Types.ObjectId
    sid: mongoose.Types.ObjectId
    score: number
}

export type Task = {
    // tid: mongoose.Types.ObjectId
    subject: string
    grade: string
    section: string
    type: string
    task_no: number
    total_items: number
    quarter: string
}

