"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPolicyModel = exports.AdminAccountModel = void 0;
const mongoose_1 = require("mongoose");
const AdminAccountSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});
const AdminPoliciesSchema = new mongoose_1.Schema({
    current_quarter: { type: String, required: true, default: 'q1' },
});
exports.AdminAccountModel = (0, mongoose_1.model)('admin_accounts', AdminAccountSchema);
exports.AdminPolicyModel = (0, mongoose_1.model)('admin_policies', AdminPoliciesSchema);
//# sourceMappingURL=admin.js.map