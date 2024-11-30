import express from 'express'
import { StudentController } from '../controllers/StudentController'
import { isAuthenticated } from '../middlewares'

const Student = new StudentController()
const { getStudents, getStudentById, deleteStudentById, updateStudentById } = Student

export default (router: express.Router) => {
    // router.post('/student/addInfo', isAuthenticated, addInformation)
    router.get('/students', isAuthenticated, getStudents) // GET ALL students
    router.get('/student/:id', isAuthenticated, getStudentById) // GET student information
    router.delete('/student/:id', isAuthenticated, deleteStudentById) // DELETE student
    router.post('/student/:id', isAuthenticated, updateStudentById) // UPDATE student profile
}