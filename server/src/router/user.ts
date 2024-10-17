import express from 'express'
import { authenticated } from '../controllers/UserController'
import { isAuthenticated, isOwner } from '../middlewares'
import { getAllStudents } from '../controllers/StudentController'

export default (router: express.Router) => {
    router.get('/authenticated', isAuthenticated, authenticated)
    router.get('/users', isAuthenticated, getAllStudents)
    // router.delete('/students/:id', isAuthenticated, deleteStudent)
    // router.patch('/students/:id', isAuthenticated, updateStudent)
}