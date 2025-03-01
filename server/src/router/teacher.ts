import express from 'express'
import { TeacherController } from '../controllers/TeacherController'
import { isAuthenticated, isOwner, isAdmin } from '../middlewares'

const Teacher = new TeacherController()
const { getTeachers, getTeacherById, deleteTeacherById, updateTeacherById } = Teacher

export default (router: express.Router) => {
    router.get('/teachers', isAuthenticated, getTeachers) // GET ALL teachers
    router.get('/teacher/:id', isAuthenticated, isOwner, getTeacherById) // GET teacher's information
    router.delete('/teacher/:id', isAuthenticated, isAdmin, deleteTeacherById) // DELETE a teacher
    router.patch('/teacher/:id', isAuthenticated, isOwner, updateTeacherById) // UPDATE teacher's profile
}