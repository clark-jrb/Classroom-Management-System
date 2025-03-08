import express from 'express'
import { UserController } from '../controllers/UserController'
import { isAuthenticated } from '../middlewares'

const User = new UserController()
const { authenticatedUser } = User

export default (router: express.Router) => {
    router.get('/authenticated', isAuthenticated, authenticatedUser)
}