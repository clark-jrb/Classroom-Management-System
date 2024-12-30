import express from 'express'
import { TaskController } from '../controllers/TaskController'
import { isAuthenticated } from '../middlewares'

const Task = new TaskController()
const { 
    createTask, 
    getTasks, 
    createTasksToStudents, 
    getStudentsTakingTask, 
    updateStudentScore, 
    getStudentsTakingMyTasks 
} = Task

export default (router: express.Router) => {
    router.get('/task', isAuthenticated, getTasks)
    router.post('/task/:id', isAuthenticated, createTask)

    router.get('/task/students', isAuthenticated, getStudentsTakingTask)
    router.post('/task/students/create', isAuthenticated, createTasksToStudents)
    router.patch('/task/students/:grade_lvl', isAuthenticated, updateStudentScore)

    router.get('/task/student', isAuthenticated, getStudentsTakingMyTasks)
}