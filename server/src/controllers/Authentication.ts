import { Request, Response } from 'express'
import { RefreshTokenModel } from '../models/refresh_token'
import { getUserByEmail, createUser } from './UserController'
import { createStudent, getStudentByEmail } from './StudentController'
import { createTeacher, getTeacherByEmail } from './TeacherController'
import { hashPassword, comparePassword } from '../utils/hashPassword'
import { generateToken, generateRefreshToken } from '../utils/createToken'

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password, role } = req.body
    var user

    try {
        if (!email || !password) { return res.json({ message: 'Wrong credentials'}) }

        switch (role) {
            case 'student':
                user = await getStudentByEmail(email)
                break
            case 'teacher':
                user = await getTeacherByEmail(email)
                break
            default:
                await getUserByEmail(email)
                break
            }

        if (!user) return res.json({ message: "User don't exist"}) 

        const matchPass = await comparePassword(password, user.password)
        if (!matchPass) return res.json({ message: 'Invalid credentials' })

        const accessToken = generateToken(user.id, user.role)
        const refreshToken = generateRefreshToken(user.id, user.role)
        
        const createRefreshToken = new RefreshTokenModel({
            user: user._id,
            refresh_token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
        })

        await createRefreshToken.save()
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000, // 15 minutes
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.json({ accessToken, refreshToken, message: "User logged in successfully!" })
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const register = async (req: Request, res: Response): Promise<any> => {
    const { 
        email, 
        password, 
        firstname, 
        role, 
        gradeLevel, 
        subjects, 
        homeroom 
    } = req.body

    try {
        if (!email || !password || !firstname) return res.json({ message: "Incomplete credentials" })

        const userExist = await getUserByEmail(email)
        if (userExist) return res.json({ message: "User already exists" })

        const hashedPassword = await hashPassword(password)

        const values = {
            firstname,
            email,
            password: hashedPassword,
            role
        }

        switch (role) {
            case 'student':
                await createStudent({...values, gradeLevel})
                break
            case 'teacher':
                await createTeacher({...values, subjects, homeroom})
                break
            default:
                await createUser(values)
                break
        }
        
        return res.status(201).json({ message: "User registered successfully!" }).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.json('User successfully logged out')
}