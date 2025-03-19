"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const UserController_1 = require("./UserController");
const hashPassword_1 = require("../utils/hashPassword");
const createToken_1 = require("../utils/createToken");
const cookieOptions_1 = require("../utils/cookieOptions");
const createToken_2 = require("../utils/createToken");
const User = new UserController_1.UserController();
const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // checks fields if empty
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'Incomplete credentials'
            });
        }
        const userExists = await User.getByEmail(email, role);
        // checks if user exists
        if (!userExists) {
            return res.json({
                success: false,
                message: "User don't exist"
            });
        }
        // generates access and refresh tokens 
        const { accessToken, refreshToken } = (0, createToken_1.createTokens)(userExists.id, userExists.role);
        // checks if password matched 
        const matchPass = await (0, hashPassword_1.comparePassword)(password, userExists.password);
        if (!matchPass) {
            return res.json({
                success: false,
                message: 'Wrong password'
            });
        }
        // creates refresh tokens on database 
        (0, createToken_2.createRefreshTokenOnDB)(userExists.id, refreshToken).save();
        return res
            .cookie("accessToken", accessToken, cookieOptions_1.accessTokenOpt)
            .cookie("refreshToken", refreshToken, cookieOptions_1.refreshTokenOpt)
            .json({
            userRole: userExists.role,
            success: true,
            message: "User logged in successfully!"
        })
            .end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    const { account, profile, classes } = req.body;
    const { email, password, role } = account;
    try {
        // check if all fields filled 
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Incomplete credentials"
            });
        }
        const userExist = await User.getByEmail(email, role);
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }
        // hash password 
        const hashedPassword = await (0, hashPassword_1.hashPassword)(password);
        // group values 
        const credentials = {
            email,
            password: hashedPassword,
            role
        };
        if (role === 'admin') {
            await User.createUser(credentials, role);
        }
        else {
            await User.createUser(credentials, role, profile, classes);
        }
        const userNowExist = await User.getByEmail(email, role);
        if (userNowExist) {
            // console.log('User now exists')
            const { accessToken, refreshToken } = (0, createToken_1.createTokens)(userNowExist.id, userNowExist.role);
            // creates refresh tokens on database 
            (0, createToken_2.createRefreshTokenOnDB)(userNowExist.id, refreshToken).save();
            // responds with access and refresh token on headers
            return res
                .cookie("accessToken", accessToken, cookieOptions_1.accessTokenOpt)
                .cookie("refreshToken", refreshToken, cookieOptions_1.refreshTokenOpt)
                .status(201).json({
                userRole: role,
                success: true,
                message: "User registered successfully!"
            })
                .end();
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
const logout = (_req, res) => {
    res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ message: 'User successfully logged out' });
};
exports.logout = logout;
//# sourceMappingURL=Authentication.js.map