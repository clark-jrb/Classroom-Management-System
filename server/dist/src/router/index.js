"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const user_1 = __importDefault(require("./user"));
const student_1 = __importDefault(require("./student"));
const teacher_1 = __importDefault(require("./teacher"));
const task_1 = __importDefault(require("./task"));
const admin_1 = __importDefault(require("./admin"));
const router = express_1.default.Router();
exports.default = () => {
    (0, admin_1.default)(router);
    (0, authentication_1.default)(router);
    (0, user_1.default)(router);
    (0, student_1.default)(router);
    (0, teacher_1.default)(router);
    (0, task_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map