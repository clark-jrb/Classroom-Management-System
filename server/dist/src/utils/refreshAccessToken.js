"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const createToken_1 = require("./createToken");
const refresh_token_1 = require("../models/refresh_token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }
    // Check if the refresh token exists in the database
    //
    const existingToken = await refresh_token_1.RefreshTokenModel.findOne({ refresh_token: refreshToken });
    if (!existingToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
    // Check if the refresh token has expired (if expired, redirect to login page)
    //
    if (existingToken.expiresAt < new Date()) {
        return res.status(403).json({ message: 'Refresh token has expired, you need to log in again' });
    }
    // Generate new access token if refresh token is not yet expired
    //
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = (0, createToken_1.generateToken)(decoded.id, decoded.role);
        return res
            .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true, // Enable in a production environment with HTTPS
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
            // maxAge: 15 * 1000, // 15 seconds (for testing)
        })
            .json({ message: "Generated new access token" });
    }
    catch (error) {
        return res.status(403).json({ message: error });
    }
};
exports.refresh = refresh;
//# sourceMappingURL=refreshAccessToken.js.map