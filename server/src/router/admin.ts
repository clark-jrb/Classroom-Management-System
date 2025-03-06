import express from 'express'
import { AdminController } from '../controllers/AdminController'
import { isAuthenticated, isAdmin } from '../middlewares'

const Admin = new AdminController()
const { getCurrentQuarter, updateCurrentQuarter, deleteUser } = Admin

export default (router: express.Router) => {
    router.get('/current_quarter', isAuthenticated, getCurrentQuarter)
    router.patch('/current_quarter/:id', isAuthenticated, isAdmin, updateCurrentQuarter)
    router.delete('/user/:role/:id', isAuthenticated, isAdmin, deleteUser)
}