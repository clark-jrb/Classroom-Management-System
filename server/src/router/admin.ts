import express from 'express'
import { AdminController } from '../controllers/AdminController'
import { isAuthenticated, isAdmin } from '../middlewares'

const Admin = new AdminController()
const { getCurrentQuarter, updateCurrentQuarter, deleteStudent } = Admin

export default (router: express.Router) => {
    router.get('/current_quarter', isAuthenticated, getCurrentQuarter)
    router.patch('/current_quarter/:id', isAuthenticated, isAdmin, updateCurrentQuarter)
    router.delete('/student/:id', isAuthenticated, isAdmin, deleteStudent)
}