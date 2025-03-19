"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = exports.createRefreshTokenOnDB = exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh_token_1 = require("../models/refresh_token");
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};
exports.generateToken = generateToken;
const generateRefreshToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const createRefreshTokenOnDB = (id, token) => {
    const createRefreshToken = new refresh_token_1.RefreshTokenModel({
        user: id,
        refresh_token: token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    });
    return createRefreshToken;
};
exports.createRefreshTokenOnDB = createRefreshTokenOnDB;
const createTokens = (id, role) => {
    const accessToken = (0, exports.generateToken)(id, role);
    const refreshToken = (0, exports.generateRefreshToken)(id, role);
    return {
        accessToken,
        refreshToken
    };
};
exports.createTokens = createTokens;
//# sourceMappingURL=createToken.js.map