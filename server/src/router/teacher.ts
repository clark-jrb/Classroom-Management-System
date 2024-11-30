import express from 'express'
import { TeacherController } from 'controllers/TeacherController'
import { isAuthenticated } from '../middlewares'

const Teacher = new TeacherController()
const { getTeachers, getTeacherById, deleteTeacherById, updateTeacherById } = Teacher

export default (router: express.Router) => {
    router.get('/teachers', isAuthenticated, getTeachers) // GET ALL teachers
    router.get('/teacher/:id', isAuthenticated, getTeacherById) // GET teacher's information
    router.delete('/teacher/:id', isAuthenticated, deleteTeacherById) // DELETE a teacher
    router.post('/teacher/:id', isAuthenticated, updateTeacherById) // UPDATE teacher's profile
}