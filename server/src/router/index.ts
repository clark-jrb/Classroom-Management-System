import express from 'express'
import authentication from './authentication'
import user from './user'
import student from './student'
import teacher from './teacher'
import task from './task'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    user(router)
    student(router)
    teacher(router)
    task(router)
    
    return router
}