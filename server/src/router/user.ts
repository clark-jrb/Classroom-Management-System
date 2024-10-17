import express from 'express'
import { UserController } from '../controllers/UserController'
import { isAuthenticated } from '../middlewares'

const User = new UserController()
const { authenticated } = User

export default (router: express.Router) => {
    router.get('/authenticated', isAuthenticated, authenticated)
}