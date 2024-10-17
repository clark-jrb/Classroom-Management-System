import express from 'express'
import { StudentController } from '../controllers/StudentController'
import { isAuthenticated } from '../middlewares'

const Student = new StudentController()
const { getStudents, getStudentById, deleteStudentById } = Student

export default (router: express.Router) => {
    router.get('/students', isAuthenticated, getStudents)
    router.get('/student/:id', isAuthenticated, getStudentById)
    router.delete('/student/:id', isAuthenticated, deleteStudentById)
}