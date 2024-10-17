import express from 'express'
import { UserFactory } from '../controllers/UserController'
import { isAuthenticated } from '../middlewares'

const User = new UserFactory()
const { authenticated } = User

export default (router: express.Router) => {
    router.get('/authenticated', isAuthenticated, authenticated)
}