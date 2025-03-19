"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskGrade6Model = exports.TaskGrade5Model = exports.TaskGrade4Model = exports.TaskGrade3Model = exports.TaskGrade2Model = exports.TaskGrade1Model = exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    tid: { type: mongoose_1.Schema.Types.ObjectId, ref: "teachers", required: true },
    subject: { type: String, required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    type: { type: String, required: true },
    task_no: { type: Number, required: true },
    total_items: { type: Number, required: true },
    quarter: { type: String, required: true }
});
const StudentTaskSchema = new mongoose_1.Schema({
    sid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    task_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "teachers_tasks", required: true },
    score: { type: Number, required: true }
});
const TaskGrade1Schema = StudentTaskSchema.clone();
const TaskGrade2Schema = StudentTaskSchema.clone();
const TaskGrade3Schema = StudentTaskSchema.clone();
const TaskGrade4Schema = StudentTaskSchema.clone();
const TaskGrade5Schema = StudentTaskSchema.clone();
const TaskGrade6Schema = StudentTaskSchema.clone();
exports.TaskModel = (0, mongoose_1.model)('teachers_tasks', TaskSchema);
// export const StudentTaskModel = model('student_tasks', StudentTaskSchema)
exports.TaskGrade1Model = (0, mongoose_1.model)('tasks_grade_1', TaskGrade1Schema);
exports.TaskGrade2Model = (0, mongoose_1.model)('tasks_grade_2', TaskGrade2Schema);
exports.TaskGrade3Model = (0, mongoose_1.model)('tasks_grade_3', TaskGrade3Schema);
exports.TaskGrade4Model = (0, mongoose_1.model)('tasks_grade_4', TaskGrade4Schema);
exports.TaskGrade5Model = (0, mongoose_1.model)('tasks_grade_5', TaskGrade5Schema);
exports.TaskGrade6Model = (0, mongoose_1.model)('tasks_grade_6', TaskGrade6Schema);
//# sourceMappingURL=task.js.map