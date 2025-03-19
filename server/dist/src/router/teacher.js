"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherController_1 = require("../controllers/TeacherController");
const middlewares_1 = require("../middlewares");
const Teacher = new TeacherController_1.TeacherController();
const { getTeachers, getTeacherById, deleteTeacherById, updateTeacherById } = Teacher;
exports.default = (router) => {
    router.get('/teachers', middlewares_1.isAuthenticated, middlewares_1.isAdmin, getTeachers); // GET ALL teachers
    router.get('/teacher/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, getTeacherById); // GET teacher's information
    router.delete('/teacher/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, deleteTeacherById); // DELETE a teacher
    router.patch('/teacher/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, updateTeacherById); // UPDATE teacher's profile
};
//# sourceMappingURL=teacher.js.map