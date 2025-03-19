"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const teacher_1 = require("../models/teacher");
const mongoose_1 = __importDefault(require("mongoose"));
class TeacherController {
    /**
     * GET TEACHERS
     */
    getTeachers = async (_req, res) => {
        try {
            const teachers = await teacher_1.TeacherAccountModel.find();
            const teachers_data = await Promise.all(teachers.map(async ({ _id }) => {
                const [account, profile, classes] = await Promise.all([
                    teacher_1.TeacherAccountModel
                        .findById(_id)
                        .select('-password -__v')
                        .lean(),
                    teacher_1.TeacherProfileModel.findOne({ tid: _id })
                        .select('-_id -tid -__v')
                        .lean(),
                    teacher_1.TeacherClassModel
                        .findOne({ tid: _id })
                        .select('-_id -tid -__v')
                        .lean()
                        .then((data) => ({
                        ...data,
                        section_handled: data.section_handled.join(", "),
                        subjects: data.subjects.join(", ")
                    })),
                ]);
                return {
                    ...account,
                    ...profile,
                    ...classes
                };
            }));
            res.status(200).json(teachers_data);
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to get teachers', error });
        }
    };
    /**
     * GET TEACHER BY ID
     */
    getTeacherById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
            }
            const [account, profile, classes] = await Promise.all([
                teacher_1.TeacherAccountModel
                    .findById(id)
                    .select('-password -__v')
                    .lean(),
                teacher_1.TeacherProfileModel.findOne({ tid: id })
                    .select('-_id -tid -__v')
                    .lean(),
                teacher_1.TeacherClassModel
                    .findOne({ tid: id })
                    .select('-_id -tid -__v')
                    .lean()
            ]);
            if (!account) {
                res.status(404).json({ message: 'Teacher cannot be found' });
            }
            res.status(200).json({ account, profile, classes });
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to get teacher', error });
        }
    };
    /**
     * DELETE TEACHER BY ID
     */
    deleteTeacherById = async (req, res) => {
        try {
            const { id } = req.params;
            await teacher_1.TeacherAccountModel.findOneAndDelete({ _id: id });
            res.status(200).json({ message: 'Teacher successfully deleted' });
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to delete teacher', error });
        }
    };
    /**
     * UPDATE TEACHER BY ID
     */
    updateTeacherById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const teacher = await teacher_1.TeacherAccountModel.findById(id);
            if (!teacher) {
                res.status(404).json({ message: "Teacher doesn't exists" });
            }
            await teacher_1.TeacherProfileModel.findOneAndUpdate({ tid: id }, { $set: data }, { new: true, runValidators: true });
            res.status(200).json({ message: "Profile updated successfully!" }).end();
        }
        catch (error) {
            console.log(error);
            res.sendStatus(400).json({ message: 'Failed to update teacher', error });
        }
    };
}
exports.TeacherController = TeacherController;
//# sourceMappingURL=TeacherController.js.map