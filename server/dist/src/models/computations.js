"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralAverageModel = exports.QuarterlyAverageModel = exports.SubjectGradeModel = void 0;
const mongoose_1 = require("mongoose");
const SubjectGradeSchema = new mongoose_1.Schema({
    sid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    subj_grade: { type: Number, required: true, default: 0 }
});
// SubjectGradeSchema.index({ section: 1, subject: 1 })
const QuarterlyAverageSchema = new mongoose_1.Schema({
    sid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quarter: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    section: { type: String, required: true },
    math: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    mapeh: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    filipino: { type: Number, default: 0 },
    hekasi: { type: Number, default: 0 },
    quarter_ave: { type: Number, default: 0 }
});
const GeneralAverageSchema = new mongoose_1.Schema({
    sid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    grade_level: { type: String, required: true },
    section: { type: String, required: true },
    math: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    mapeh: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    filipino: { type: Number, default: 0 },
    hekasi: { type: Number, default: 0 },
    general_ave: { type: Number, default: 0 }
});
QuarterlyAverageSchema.index({ section: 1 });
GeneralAverageSchema.index({ section: 1 });
exports.SubjectGradeModel = (0, mongoose_1.model)('students_sgs', SubjectGradeSchema);
exports.QuarterlyAverageModel = (0, mongoose_1.model)('students_qas', QuarterlyAverageSchema);
exports.GeneralAverageModel = (0, mongoose_1.model)('students_gas', GeneralAverageSchema);
// sgs = subject grade(s)
// qas = quarterly average(s)
// gas = general average(s)
//# sourceMappingURL=computations.js.map