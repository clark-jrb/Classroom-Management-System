import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    tid: { type: Schema.Types.ObjectId, ref: "teachers", required: true },
    subject: { type: String, required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    type: { type: String, required: true },
    task_no: { type: Number, required: true },
    total_items: { type: Number, required: true },
    quarter: { type: String, required: true }
})

export const TaskModel = model('tasks', TaskSchema)
