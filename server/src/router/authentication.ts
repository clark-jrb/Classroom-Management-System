import express from 'express'

import { register, login, logout } from '../controllers/Authentication'
import { refresh } from '../utils/refreshAccessToken'

export default (router: express.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.post('/auth/refresh', refresh)
    router.post('/auth/logout', logout)
}