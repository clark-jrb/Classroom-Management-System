"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectClassModel = exports.selectProfileModel = exports.selectAccountModel = exports.selectTaskGradeModel = void 0;
const student_1 = require("../models/student");
const teacher_1 = require("../models/teacher");
const task_1 = require("../models/task");
const admin_1 = require("../models/admin");
const selectTaskGradeModel = (grade) => {
    const selectedModel = {
        grade_1: task_1.TaskGrade1Model,
        grade_2: task_1.TaskGrade2Model,
        grade_3: task_1.TaskGrade3Model,
        grade_4: task_1.TaskGrade4Model,
        grade_5: task_1.TaskGrade5Model,
        grade_6: task_1.TaskGrade6Model,
    };
    return selectedModel[grade];
};
exports.selectTaskGradeModel = selectTaskGradeModel;
const selectAccountModel = (role) => {
    const selectedModel = {
        student: student_1.StudentAccountModel,
        faculty: teacher_1.TeacherAccountModel,
        admin: admin_1.AdminAccountModel
    };
    return selectedModel[role];
};
exports.selectAccountModel = selectAccountModel;
const selectProfileModel = (role) => {
    const selectedModel = {
        student: student_1.StudentProfileModel,
        faculty: teacher_1.TeacherProfileModel
    };
    return selectedModel[role];
};
exports.selectProfileModel = selectProfileModel;
const selectClassModel = (role) => {
    const selectedModel = {
        student: student_1.StudentClassModel,
        faculty: teacher_1.TeacherClassModel
    };
    return selectedModel[role];
};
exports.selectClassModel = selectClassModel;
//# sourceMappingURL=select-models.js.map