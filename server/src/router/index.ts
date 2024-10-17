import express from 'express'
import authentication from './authentication'
import user from './user'
import student from './student'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    user(router)
    student(router)
    
    return router
}