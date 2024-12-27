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

const StudentTaskSchema = new Schema({
    sid: { type: Schema.Types.ObjectId, required: true },
    task_id: { type: Schema.Types.ObjectId, ref: "tasks", required: true },
    score: { type: Number, required: true }
})

const TaskGrade1Schema = StudentTaskSchema.clone()
const TaskGrade2Schema = StudentTaskSchema.clone()
const TaskGrade3Schema = StudentTaskSchema.clone()
const TaskGrade4Schema = StudentTaskSchema.clone()
const TaskGrade5Schema = StudentTaskSchema.clone()
const TaskGrade6Schema = StudentTaskSchema.clone()

export const TaskModel = model('tasks', TaskSchema)
export const StudentTaskModel = model('student_tasks', StudentTaskSchema)

export const TaskGrade1Model = model('tasks_grade_1', StudentTaskSchema)
export const TaskGrade2Model = model('tasks_grade_2', StudentTaskSchema)
export const TaskGrade3Model = model('tasks_grade_3', StudentTaskSchema)
export const TaskGrade4Model = model('tasks_grade_4', StudentTaskSchema)
export const TaskGrade5Model = model('tasks_grade_5', StudentTaskSchema)
export const TaskGrade6Model = model('tasks_grade_6', StudentTaskSchema)
