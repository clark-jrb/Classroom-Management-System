"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskController_1 = require("../controllers/TaskController");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const Task = new TaskController_1.TaskController();
const { createTask, updateTask, deleteTask, getTasks, createTasksToStudents, getStudentsTakingTask, updateStudentsScores, getStudentsTakingMyTasks, getMyStudentsPerformance, createStudentsSGs, getStudentsSGs, updateStudentsSGs, getStudentsQAs, getStudentsCalculatedQA, updateStudentsSGfromQA, getStudentsSGfromQA, createStudentsGA, getStudentsGA, getStudentGA } = Task;
exports.default = (router) => {
    router.get('/tasks', middlewares_1.isAuthenticated, getTasks);
    router.patch('/task/:id', middlewares_1.isAuthenticated, updateTask);
    router.delete('/task/:id', middlewares_1.isAuthenticated, deleteTask);
    router.post('/task/:tid', middlewares_1.isAuthenticated, createTask); // gets teacher id params for ownership of the task
    router.post('/tasks/students', middlewares_1.isAuthenticated, createTasksToStudents);
    router.get('/students/task/:id', middlewares_1.isAuthenticated, middlewares_2.isOwner, getStudentsTakingTask);
    router.get('/students/my_tasks', middlewares_1.isAuthenticated, getStudentsTakingMyTasks);
    router.patch('/students/scores', middlewares_1.isAuthenticated, updateStudentsScores); // find students according to grade level and updates scores
    router.get('/students/performance', middlewares_1.isAuthenticated, getMyStudentsPerformance);
    router.post('/students/sg', middlewares_1.isAuthenticated, createStudentsSGs);
    router.get('/students/sg', middlewares_1.isAuthenticated, getStudentsSGs);
    router.patch('/students/sg', middlewares_1.isAuthenticated, updateStudentsSGs);
    router.get('/students/qa', middlewares_1.isAuthenticated, getStudentsQAs);
    router.get('/students/calculated/qa', middlewares_1.isAuthenticated, getStudentsCalculatedQA);
    router.patch('/students/qa/sg', middlewares_1.isAuthenticated, updateStudentsSGfromQA);
    router.get('/students/qa/sg', middlewares_1.isAuthenticated, getStudentsSGfromQA);
    router.post('/students/ga', middlewares_1.isAuthenticated, createStudentsGA);
    router.get('/students/ga', middlewares_1.isAuthenticated, getStudentsGA);
    router.get('/student/ga/:sid', middlewares_1.isAuthenticated, getStudentGA);
};
//# sourceMappingURL=task.js.map