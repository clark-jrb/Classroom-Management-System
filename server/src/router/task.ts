import express from 'express'
import { TaskController } from '../controllers/TaskController'
import { isAuthenticated } from '../middlewares'

const Task = new TaskController()
const { 
    createTask, 
    updateTask,
    deleteTask,
    getTasks, 
    createTasksToStudents, 
    getStudentsTakingTask, 
    updateStudentsScores, 
    getStudentsTakingMyTasks,
    getMyStudentsPerformance,
    createStudentsSGs,
    getStudentsSGs,
    updateStudentsSGs,
    getStudentsQAs,
    getStudentsCalculatedQA,
    updateStudentsSGfromQA,
    getStudentsSGfromQA,
    createStudentsGA,
    getStudentsGA,
    getStudentGA
} = Task

export default (router: express.Router) => {
    router.get('/tasks', isAuthenticated, getTasks)
    router.patch('/task/:id', isAuthenticated, updateTask)
    router.delete('/task/:id', isAuthenticated, deleteTask)
    router.post('/task/:tid', isAuthenticated, createTask) // gets teacher id params for ownership of the task
    router.post('/tasks/students', isAuthenticated, createTasksToStudents)

    router.get('/students/task', isAuthenticated, getStudentsTakingTask)
    router.get('/students/my_tasks', isAuthenticated, getStudentsTakingMyTasks)
    router.patch('/students/scores', isAuthenticated, updateStudentsScores) // find students according to grade level and updates scores

    router.get('/students/performance', isAuthenticated, getMyStudentsPerformance)
    
    router.post('/students/sg', isAuthenticated, createStudentsSGs)
    router.get('/students/sg', isAuthenticated, getStudentsSGs)
    router.patch('/students/sg', isAuthenticated, updateStudentsSGs)

    router.get('/students/qa', isAuthenticated, getStudentsQAs)
    router.get('/students/calculated/qa', isAuthenticated, getStudentsCalculatedQA)
    
    router.patch('/students/qa/sg', isAuthenticated, updateStudentsSGfromQA)
    router.get('/students/qa/sg', isAuthenticated, getStudentsSGfromQA)

    router.post('/students/ga', isAuthenticated, createStudentsGA)
    router.get('/students/ga', isAuthenticated, getStudentsGA)
    router.get('/student/ga/:sid', isAuthenticated, getStudentGA)
}