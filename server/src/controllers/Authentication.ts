import { Request, Response } from 'express'
import { UserController } from './UserController'
import { hashPassword, comparePassword } from '../utils/hashPassword'
import { createTokens } from '../utils/createToken'
import { accessTokenOpt, refreshTokenOpt } from '../utils/cookieOptions'
import { createRefreshTokenOnDB } from '../utils/createToken'
import { UserAccount, UserProfile } from 'types/UserTypes'
import { StudentClass } from 'types/StudentTypes'
import { TeacherClass } from 'types/TeacherTypes'

const User = new UserController()

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password, role } = req.body

    try {
        // checks fields if empty
        if (!email || !password) {
            return res.json({ message: 'Incomplete credentials'})
        }
        
        const userExists = await User.getByEmail(email, role)
        // checks if user exists
        if (!userExists) {
            return res.json({ message: "User don't exist"})
        }

        // generates access and refresh tokens 
        const { accessToken, refreshToken } = createTokens(userExists.id, userExists.role)

        // checks if password matched 
        const matchPass = await comparePassword(password, userExists.password)

        if (!matchPass) {
            return res.json({ message: 'Wrong password' })
        }

        // creates refresh tokens on database 
        createRefreshTokenOnDB(userExists.id, refreshToken).save()

        return res
            .cookie("accessToken", accessToken, accessTokenOpt)
            .cookie("refreshToken", refreshToken, refreshTokenOpt)
            .json({ userRole: userExists.role, message: "User logged in successfully!" })
            .end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const register = async (req: Request, res: Response): Promise<any> => {
    const { account, profile, classes }: {
        account: UserAccount,
        profile: UserProfile,
        classes: StudentClass | TeacherClass
    } = req.body
    const { email, password, role } = account
    
    try {
        // check if all fields filled 
        if (!email || !password) {
            return res.json({ message: "Incomplete credentials" })
        }
        
        const userExist = await User.getByEmail(email, role)
        if (userExist) {
            return res.json({ message: "User already exists" })
        }

        // hash password 
        const hashedPassword = await hashPassword(password)

        // group values 
        const credentials = {
            email,
            password: hashedPassword,
            role
        }

        if (role === 'admin') {
            await User.createUser(credentials, role)      
        } else {
            await User.createUser(credentials, role, profile, classes) 
        }
        
        const userNowExist = await User.getByEmail(email, role)

        if (userNowExist) {
            // console.log('User now exists')
            const { accessToken, refreshToken } = createTokens(userNowExist.id, userNowExist.role)
            
            // creates refresh tokens on database 
            createRefreshTokenOnDB(userNowExist.id, refreshToken).save()

            // responds with access and refresh token on headers
            return res
                .cookie("accessToken", accessToken, accessTokenOpt)
                .cookie("refreshToken", refreshToken, refreshTokenOpt)
                .status(201).json({ userRole: role, message: "User registered successfully!" })
                .end()
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const logout = (req: Request, res: Response) => {
    res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ message: 'User successfully logged out' })
}