import mongoose from "mongoose"

export interface StudentTask {
    _id: mongoose.Types.ObjectId
    sid: mongoose.Types.ObjectId
    score: number
}

export interface Task {
    // tid: mongoose.Types.ObjectId
    subject: string
    grade: string
    section: string
    type: string
    task_no: number
    total_items: number
    quarter: string
}