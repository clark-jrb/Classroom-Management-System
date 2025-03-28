import express from 'express'
import { StudentController } from '../controllers/StudentController'
import { isAuthenticated, isAdmin } from '../middlewares'

const Student = new StudentController()
const { getStudents, getStudentById, deleteStudentById, updateStudentById, getStudentByClass, getStudentQAs } = Student

export default (router: express.Router) => {
    // router.post('/student/addInfo', isAuthenticated, addInformation)
    router.get('/students', isAuthenticated, isAdmin, getStudents) // GET ALL students
    router.get('/student/:id', isAuthenticated, getStudentById) // GET student information
    router.delete('/student/:id', isAuthenticated, deleteStudentById) // DELETE student
    router.patch('/student/:id', isAuthenticated, updateStudentById) // UPDATE student profile

    router.get('/my_students', isAuthenticated, getStudentByClass)
    router.get('/student/qa/:sid', isAuthenticated, getStudentQAs)
}