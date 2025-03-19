"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_1 = require("../models/admin");
const student_1 = require("../models/student");
const computations_1 = require("../models/computations");
const select_models_1 = require("../helpers/select-models");
const teacher_1 = require("../models/teacher");
const task_1 = require("../models/task");
const refresh_token_1 = require("../models/refresh_token");
class AdminController {
    /**
     * name
     */
    getCurrentQuarter = async (_req, res) => {
        try {
            const current_quarter = await admin_1.AdminPolicyModel.find();
            if (!current_quarter.length) {
                res.status(404).json({ message: 'Current quarter not found' });
            }
            else {
                res.status(200).json(current_quarter[0]); // get only the first element
            }
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to get current quarter' });
        }
    };
    /**
     * name
     */
    updateCurrentQuarter = async (req, res) => {
        try {
            const { id } = req.params;
            const { current_quarter } = req.body;
            await admin_1.AdminPolicyModel.findByIdAndUpdate(id, { current_quarter: current_quarter }, { new: true });
            res.status(200).json({ message: 'Succesfully updated current quarter' });
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to update current quarter' });
        }
    };
    /**
     * name
     */
    deleteUser = async (req, res) => {
        try {
            const { id, role } = req.params;
            if (role === 'student') {
                const student = await student_1.StudentClassModel.findOne({ sid: id });
                const TaskGradeModel = (0, select_models_1.selectTaskGradeModel)(student.gradeLevel);
                await Promise.all([
                    student_1.StudentAccountModel.findByIdAndDelete(id),
                    student_1.StudentProfileModel.findOneAndDelete({ sid: id }),
                    student_1.StudentClassModel.findOneAndDelete({ sid: id }),
                    computations_1.QuarterlyAverageModel.deleteMany({ sid: id }),
                    computations_1.SubjectGradeModel.deleteMany({ sid: id }),
                    computations_1.GeneralAverageModel.findOneAndDelete({ sid: id }),
                    TaskGradeModel.deleteMany({ sid: id }),
                    refresh_token_1.RefreshTokenModel.deleteMany({ user: id })
                ]);
                res.status(200).json({ message: 'Successfully deleted student' });
            }
            if (role === 'faculty') {
                await Promise.all([
                    teacher_1.TeacherAccountModel.findByIdAndDelete(id),
                    teacher_1.TeacherProfileModel.findOneAndDelete({ tid: id }),
                    teacher_1.TeacherClassModel.findOneAndDelete({ tid: id }),
                    task_1.TaskModel.deleteMany({ tid: id }),
                    refresh_token_1.RefreshTokenModel.deleteMany({ user: id })
                ]);
                res.status(200).json({ message: 'Successfully deleted teacher' });
            }
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to delete user' });
        }
    };
}
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map