import express from 'express'
import { StudentController } from '../controllers/StudentController'
import { isAuthenticated } from '../middlewares'

const Student = new StudentController()
const { getStudents, getStudentById, deleteStudentById, addInformation } = Student

export default (router: express.Router) => {
    router.post('/student/addInfo', isAuthenticated, addInformation)
    router.get('/students', isAuthenticated, getStudents)
    router.get('/student/:id', isAuthenticated, getStudentById)
    router.delete('/student/:id', isAuthenticated, deleteStudentById)
}