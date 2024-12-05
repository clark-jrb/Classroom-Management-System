import express from 'express'
import { TaskController } from '../controllers/TaskController'
import { isAuthenticated } from '../middlewares'

const Task = new TaskController()
const { createTask, findTask } = Task

export default (router: express.Router) => {
    router.post('/task/:id', isAuthenticated, createTask)
    router.get('/task', isAuthenticated, findTask)
}