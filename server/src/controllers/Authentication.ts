import { Request, Response } from 'express'
import { RefreshTokenModel } from '../models/refresh_token'
import { UserFactory } from './UserController'
import { hashPassword, comparePassword } from '../utils/hashPassword'
import { generateToken, generateRefreshToken } from '../utils/createToken'

const User = new UserFactory()

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password, role } = req.body
    // var user

    const userExists = await User.getByEmail(email, role)

    try {
        if (!email || !password) { return res.json({ message: 'Incomplete credentials'}) }

        // check if user exists
        //
        if (!userExists) return res.json({ message: "User don't exist"}) 

        // check if password matched 
        //
        const matchPass = await comparePassword(password, userExists.password)
        if (!matchPass) return res.json({ message: 'Wrong password' })

        // generate access ad refresh tokens 
        //
        const accessToken = generateToken(userExists.id, userExists.role)
        const refreshToken = generateRefreshToken(userExists.id, userExists.role)
        
        // create refresh tokens on database 
        //
        const createRefreshToken = new RefreshTokenModel({
            user: userExists._id,
            refresh_token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
        })
        await createRefreshToken.save()
        
        // respond with access and refresh token on headers
        //
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

    const userExist = await User.getByEmail(email, role)

    try {
        // check if all fields filled 
        //
        if (!email || !password || !firstname) return res.json({ message: "Incomplete credentials" })

        // const userExist = await getUserByEmail(email)
        //
        if (userExist) return res.json({ message: "User already exists" })

        // hash password 
        //
        const hashedPassword = await hashPassword(password)

        // group values 
        //
        const values = {
            firstname,
            email,
            password: hashedPassword,
            role,
            gradeLevel,
            subjects,
            homeroom
        }

        await User.createUser(values, role)
        
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