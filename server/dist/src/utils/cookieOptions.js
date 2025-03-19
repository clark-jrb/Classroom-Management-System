"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenOpt = exports.accessTokenOpt = void 0;
exports.accessTokenOpt = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
};
exports.refreshTokenOpt = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
//# sourceMappingURL=cookieOptions.js.map