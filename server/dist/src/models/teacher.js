"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherClassModel = exports.TeacherProfileModel = exports.TeacherAccountModel = void 0;
const mongoose_1 = require("mongoose");
const TeacherAccountSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, requird: true },
    role: { type: String, required: true },
});
const TeacherProfileSchema = new mongoose_1.Schema({
    tid: { type: mongoose_1.Schema.Types.ObjectId, ref: "teachers_accounts", required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    birth_date: { type: Date, required: false, default: null },
    contact: { type: String, required: true },
});
const TeacherClassSchema = new mongoose_1.Schema({
    tid: { type: mongoose_1.Schema.Types.ObjectId, ref: "teachers_accounts", required: true },
    teacher_role: { type: String, required: true },
    grade_assigned: { type: String, required: true },
    section_handled: { type: [String], required: true },
    subjects: { type: [String], required: true }
});
TeacherProfileSchema.index({ tid: 1 });
TeacherClassSchema.index({ tid: 1 });
TeacherAccountSchema.virtual("details", {
    ref: "teachers_class",
    localField: "_id",
    foreignField: "tid",
    justOne: true
});
TeacherAccountSchema.set("toJSON", { virtuals: true });
TeacherAccountSchema.set("toObject", { virtuals: true });
exports.TeacherAccountModel = (0, mongoose_1.model)('teachers_accounts', TeacherAccountSchema);
exports.TeacherProfileModel = (0, mongoose_1.model)('teachers_profiles', TeacherProfileSchema);
exports.TeacherClassModel = (0, mongoose_1.model)('teachers_class', TeacherClassSchema);
//# sourceMappingURL=teacher.js.map