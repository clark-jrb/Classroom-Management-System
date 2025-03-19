"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentClassModel = exports.StudentProfileModel = exports.StudentAccountModel = void 0;
const mongoose_1 = require("mongoose");
const StudentAccountSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});
const StudentProfileSchema = new mongoose_1.Schema({
    sid: { type: mongoose_1.Schema.Types.ObjectId, ref: "students_accounts", required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
});
const StudentClassSchema = new mongoose_1.Schema({
    sid: { type: mongoose_1.Schema.Types.ObjectId, ref: "students_accounts", required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
});
StudentProfileSchema.index({ sid: 1 });
StudentClassSchema.index({ sid: 1 });
exports.StudentAccountModel = (0, mongoose_1.model)('students_accounts', StudentAccountSchema);
exports.StudentProfileModel = (0, mongoose_1.model)('students_profiles', StudentProfileSchema);
exports.StudentClassModel = (0, mongoose_1.model)('students_class', StudentClassSchema);
//# sourceMappingURL=student.js.map