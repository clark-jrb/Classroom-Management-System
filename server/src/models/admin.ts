import { model, Schema } from "mongoose";

const AdminAccountSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

const AdminPoliciesSchema = new Schema({
    current_quarter: { type: String, required: true, default: 'q1' },
})

export const AdminAccountModel = model('admin_accounts', AdminAccountSchema)
export const AdminPolicyModel = model('admin_policies', AdminPoliciesSchema)