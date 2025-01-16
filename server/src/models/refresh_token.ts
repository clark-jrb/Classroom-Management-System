import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    refresh_token: { type: String },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
})

export const RefreshTokenModel = mongoose.model('refresh_tokens', RefreshTokenSchema) 