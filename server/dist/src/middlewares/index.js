"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isAdmin = exports.isOwner = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isOwner = (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;
        if (!currentUser) {
            res.status(401).json({ message: "You are not authenticated" });
            return;
        }
        if (currentUser.id !== id) {
            res.status(403).json({ message: 'You are not the owner to perform this action' });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error" });
        return;
    }
};
exports.isOwner = isOwner;
const isAdmin = (req, res, next) => {
    try {
        const currentUser = req.user;
        if (!currentUser) {
            res.status(401).json({ message: "You are not authenticated" });
            return;
        }
        if (currentUser.role !== 'admin') {
            res.status(403).json({ message: 'You are not an admin to perform this action' });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error" });
        return;
    }
};
exports.isAdmin = isAdmin;
const isAuthenticated = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        res.status(401).json({ message: 'No access token, authorization denied' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Token is not valid or has expired' });
        return;
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map