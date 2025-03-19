"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const select_models_1 = require("../helpers/select-models");
const computations_1 = require("../models/computations");
class UserController {
    // get user by email 
    async getByEmail(email, role) {
        const Model = (0, select_models_1.selectAccountModel)(role);
        return await Model.findOne({ email: email });
    }
    // create user (student and teachers) 
    async createUser(accountData, role, profileData, classData) {
        const AccountModel = (0, select_models_1.selectAccountModel)(role); // Select on StudentAccountModel, TeacherAccountModel
        const ProfileModel = (0, select_models_1.selectProfileModel)(role); // Select on StudentProfileModel, TeacherProfileModel
        const ClassModel = (0, select_models_1.selectClassModel)(role); // Select on StudentClassModel, TeacherClassModel
        const user = await AccountModel.create(accountData); // Save account on database
        if (role === 'student') {
            const student_class = classData;
            const quarters = ['q1', 'q2', 'q3', 'q4'];
            const for_students_qa = quarters.map(quarter => ({
                sid: user._id,
                quarter: quarter,
                ...student_class
            }));
            return await Promise.all([
                ProfileModel.create({ sid: user._id, ...profileData }),
                ClassModel.create({ sid: user._id, ...student_class }),
                computations_1.QuarterlyAverageModel.insertMany(for_students_qa)
            ]);
        }
        if (role === 'faculty') {
            const teacher_class = classData;
            return await Promise.all([
                ProfileModel.create({ tid: user._id, ...profileData }),
                ClassModel.create({ tid: user._id, ...teacher_class })
            ]);
        }
    }
    // is user authenticated?
    authenticatedUser = async (req, res) => {
        try {
            const user = req.user;
            const { accessToken } = req.cookies; // get access token from cookie on server
            const { role, id } = user;
            const Model = (0, select_models_1.selectAccountModel)(role);
            if (role === 'faculty') {
                const faculty = await Model
                    .findById(id)
                    .populate({
                    path: "details"
                });
                res.json({
                    currentUser: faculty,
                    accessToken: accessToken
                });
            }
            else {
                const student = await Model.findById(id);
                res.json({
                    currentUser: student,
                    accessToken: accessToken
                });
            }
        }
        catch (error) {
            res.status(401).json({ message: 'Token expired' });
        }
    };
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map