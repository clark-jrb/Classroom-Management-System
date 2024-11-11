import { Request, Response } from 'express'
import { UserController } from './UserController'
import { hashPassword, comparePassword } from '../utils/hashPassword'
import { createTokens } from '../utils/createToken'
import { accessTokenOpt, refreshTokenOpt } from '../utils/cookieOptions'
import { createRefreshTokenOnDB } from '../utils/createToken'

const User = new UserController()

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password, role } = req.body

    const userExists = await User.getByEmail(email, role)
    // generates access and refresh tokens 
    const { accessToken, refreshToken } = createTokens(userExists.id, userExists.role)

    try {
        // checks fields if empty
        if (!email || !password) return res.json({ message: 'Incomplete credentials'}) 

        // checks if user exists
        if (!userExists) return res.json({ message: "User don't exist"}) 

        // checks if password matched 
        const matchPass = await comparePassword(password, userExists.password)
        if (!matchPass) return res.json({ message: 'Wrong password' })

        // creates refresh tokens on database 
        createRefreshTokenOnDB(userExists.id, refreshToken).save()

        return res
            .cookie("accessToken", accessToken, accessTokenOpt)
            .cookie("refreshToken", refreshToken, refreshTokenOpt)
            .json({ accessToken, refreshToken, userRole: userExists.role, message: "User logged in successfully!" })
            .end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const register = async (req: Request, res: Response): Promise<any> => {
    const { 
        email, password, role, firstname, middlename, lastname, sex, birth_date, contact,
        gradeLevel, subjects, homeroom 
    } = req.body

    const student_info = { firstname, middlename, lastname, sex, birth_date, contact, email,  gradeLevel }
    const faculty_info = { firstname, middlename, lastname, sex, birth_date, contact, email,  subjects, homeroom  }

    const userExist = await User.getByEmail(email, role)

    try {
        // check if all fields filled 
        if (!email || !password) return res.json({ message: "Incomplete credentials" })

        // const userExist = await getUserByEmail(email)
        if (userExist) return res.json({ message: "User already exists" })

        // hash password 
        const hashedPassword = await hashPassword(password)

        // group values 
        const credentials = {
            email,
            password: hashedPassword,
            role
        }

        if (role === 'student') { await User.createUser(credentials, student_info, role) }
        if (role === 'faculty') { await User.createUser(credentials, faculty_info, role) }
        
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

export const logout = async (req: Request, res: Response): Promise<any> => {
    return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ message: 'User successfully logged out'})
}