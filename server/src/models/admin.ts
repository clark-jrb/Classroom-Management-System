import { model, Schema } from "mongoose";

const AdminAccountSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

export const AdminAccountModel = model('admin_accounts', AdminAccountSchema)