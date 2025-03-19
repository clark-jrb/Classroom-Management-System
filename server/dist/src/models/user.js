"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, requird: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], required: true }
});
const UserModel = (0, mongoose_1.model)('users', UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map