"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_1 = require("../models/student");
const mongoose_1 = __importDefault(require("mongoose"));
const computations_1 = require("../models/computations");
class StudentController {
    getStudents = async (_req, res) => {
        try {
            const students = await student_1.StudentAccountModel.find();
            // const getStudentId = students.map(student => student._id)
            const students_data = await Promise.all(students.map(async ({ _id }) => {
                const [account, profile, classes] = await Promise.all([
                    student_1.StudentAccountModel
                        .findById(_id)
                        .select('-password -__v')
                        .lean(),
                    student_1.StudentProfileModel
                        .findOne({ sid: _id })
                        .select('-_id -sid -__v')
                        .lean(),
                    student_1.StudentClassModel
                        .findOne({ sid: _id })
                        .select('-_id -sid -__v')
                        .lean(),
                ]);
                return {
                    ...account,
                    ...profile,
                    ...classes
                };
            }));
            res.status(200).json(students_data);
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to get students', error });
        }
    };
    getStudentById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
            }
            const [account, profile, classes] = await Promise.all([
                student_1.StudentAccountModel.findById(id),
                student_1.StudentProfileModel.findOne({ sid: id }).select('-_id -sid -__v'),
                student_1.StudentClassModel.findOne({ sid: id }).select('-_id -sid -__v'),
            ]);
            if (!account) {
                res.status(404).json({ message: 'Student cannot be found' });
            }
            res.status(200).json({ account, profile, classes });
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to get student', error });
        }
    };
    deleteStudentById = async (req, res) => {
        try {
            const { id } = req.params;
            await student_1.StudentAccountModel.findOneAndDelete({ _id: id });
            res.status(200).json({ message: 'Student successfully deleted' });
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to delete student', error });
        }
    };
    updateStudentById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const student = await student_1.StudentAccountModel.findById(id);
            if (!student) {
                res.status(404).json({ message: "Student doesn't exists" });
            }
            await student_1.StudentProfileModel.findOneAndUpdate({ sid: id }, { $set: data }, { new: true, runValidators: true });
            res.status(200).json({ message: "Profile updated successfully" }).end();
        }
        catch (error) {
            console.log(error);
            res.sendStatus(400).json({ message: 'Failed to update student', error });
        }
        // return await StudentAccountModel.findByIdAndUpdate(id, values)
    };
    /**
     * GET students by its class
     */
    getStudentByClass = async (req, res) => {
        try {
            const { gradeLevel, section } = req.query;
            const students = await student_1.StudentClassModel
                .find({
                gradeLevel: gradeLevel,
                section: section
            })
                .populate({
                path: 'sid',
                model: 'students_profiles',
                localField: 'sid',
                foreignField: 'sid'
            })
                .lean();
            const data = students.map(({ sid, ...rest }) => ({
                ...rest,
                ...sid
            }));
            res.status(200).json(data);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Failed to find students', error });
        }
    };
    /**
     * name
     */
    getStudentQAs = async (req, res) => {
        try {
            const { sid } = req.params;
            const quarters = ['q1', 'q2', 'q3', 'q4'];
            const student_qas = await computations_1.QuarterlyAverageModel.find({
                sid: sid
            });
            const sorted_qas = student_qas.sort((a, b) => quarters.indexOf(a.quarter) - quarters.indexOf(b.quarter));
            res.status(200).json(sorted_qas);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Failed to find student qa', error });
        }
    };
}
exports.StudentController = StudentController;
//# sourceMappingURL=StudentController.js.map