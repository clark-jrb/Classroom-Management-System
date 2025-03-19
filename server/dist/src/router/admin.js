"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminController_1 = require("../controllers/AdminController");
const middlewares_1 = require("../middlewares");
const Admin = new AdminController_1.AdminController();
const { getCurrentQuarter, updateCurrentQuarter, deleteUser } = Admin;
exports.default = (router) => {
    router.get('/current_quarter', middlewares_1.isAuthenticated, getCurrentQuarter);
    router.patch('/current_quarter/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, updateCurrentQuarter);
    router.delete('/user/:role/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, deleteUser);
};
//# sourceMappingURL=admin.js.map