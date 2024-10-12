import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from 'crypto'

export const randomNum = () => crypto.randomBytes(128).toString('base64')

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET_TOKEN).digest('hex')
}