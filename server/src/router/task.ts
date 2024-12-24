import express from 'express'
import { TaskController } from '../controllers/TaskController'
import { isAuthenticated } from '../middlewares'

const Task = new TaskController()
const { createTask, getTasks, createStudentTasks, getStudentTasks, updateStudentScore, getSpecificStudentTasks } = Task

export default (router: express.Router) => {
    router.post('/task/:id', isAuthenticated, createTask)
    router.get('/task', isAuthenticated, getTasks)
    router.post('/task/students/create', isAuthenticated, createStudentTasks)
    router.get('/task/students/:id', isAuthenticated, getStudentTasks)
    router.patch('/task/students/update', isAuthenticated, updateStudentScore)

    router.get('/task/student/:id', isAuthenticated, getSpecificStudentTasks)
}