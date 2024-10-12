import express from 'express'
import { getAllUsers } from '../controllers/UserController'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
    // router.delete('/students/:id', isAuthenticated, deleteStudent)
    // router.patch('/students/:id', isAuthenticated, updateStudent)
}