"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controllers/UserController");
const middlewares_1 = require("../middlewares");
const User = new UserController_1.UserController();
const { authenticatedUser } = User;
exports.default = (router) => {
    router.get('/authenticated', middlewares_1.isAuthenticated, authenticatedUser);
};
//# sourceMappingURL=user.js.map