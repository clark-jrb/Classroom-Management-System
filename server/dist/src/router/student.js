"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StudentController_1 = require("../controllers/StudentController");
const middlewares_1 = require("../middlewares");
const Student = new StudentController_1.StudentController();
const { getStudents, getStudentById, deleteStudentById, updateStudentById, getStudentByClass, getStudentQAs } = Student;
exports.default = (router) => {
    // router.post('/student/addInfo', isAuthenticated, addInformation)
    router.get('/students', middlewares_1.isAuthenticated, middlewares_1.isAdmin, getStudents); // GET ALL students
    router.get('/student/:id', middlewares_1.isAuthenticated, getStudentById); // GET student information
    router.delete('/student/:id', middlewares_1.isAuthenticated, deleteStudentById); // DELETE student
    router.patch('/student/:id', middlewares_1.isAuthenticated, updateStudentById); // UPDATE student profile
    router.get('/my_students', middlewares_1.isAuthenticated, getStudentByClass);
    router.get('/student/qa/:sid', middlewares_1.isAuthenticated, getStudentQAs);
};
//# sourceMappingURL=student.js.map