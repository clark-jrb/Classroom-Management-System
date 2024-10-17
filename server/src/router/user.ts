import express from 'express'
import { UserFactory } from '../controllers/UserController'
import { isAuthenticated, isOwner } from '../middlewares'

const User = new UserFactory()
const { authenticated } = User

export default (router: express.Router) => {
    router.get('/authenticated', isAuthenticated, authenticated)
    // router.delete('/students/:id', isAuthenticated, deleteStudent)
    // router.patch('/students/:id', isAuthenticated, updateStudent)
}