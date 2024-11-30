import express from 'express'
import { register, login, logout } from '../controllers/Authentication'
import { refresh } from '../utils/refreshAccessToken'

export default (router: express.Router) => {
    router.post('/auth/register', register) // register students and teachers
    router.post('/auth/login', login) // login students and teachers
    router.post('/auth/refresh', refresh) // refresh access token if expired on the server
    router.post('/auth/logout', logout) // logs out students and teachers
}