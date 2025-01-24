import express from 'express'
import { TaskController } from '../controllers/TaskController'
import { isAuthenticated } from '../middlewares'

const Task = new TaskController()
const { 
    createTask, 
    getTasks, 
    createTasksToStudents, 
    getStudentsTakingTask, 
    updateStudentsScores, 
    getStudentsTakingMyTasks,
    getMyStudentsPerformance,
    createStudentGWA
} = Task

export default (router: express.Router) => {
    router.get('/tasks', isAuthenticated, getTasks)
    router.post('/task/:tid', isAuthenticated, createTask) // gets teacher id params for ownership of the task
    router.post('/tasks/students', isAuthenticated, createTasksToStudents)

    router.get('/students/task', isAuthenticated, getStudentsTakingTask)
    router.get('/students/my_tasks', isAuthenticated, getStudentsTakingMyTasks)
    router.patch('/students/scores', isAuthenticated, updateStudentsScores) // find students according to grade level and updates scores

    router.get('/students/performance', isAuthenticated, getMyStudentsPerformance)
    router.post('/students/gwa', isAuthenticated, createStudentGWA)
}