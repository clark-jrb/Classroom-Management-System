import { Request, Response } from "express"
import { selectModel, selectPersonalModel, selectClassModel } from "../helpers/select-models"
import { ValidRoles } from "../types/types"
import { StudentClass } from "../types/StudentTypes"
import { UserAccount, UserProfile } from "../types/UserTypes"
import { TeacherClass } from "../types/TeacherTypes"
import { GPAModel } from "../models/computations"

export class UserController {
    // get user by email 
    public async getByEmail(
        email: string, 
        role: ValidRoles
    ) {
        const Model = selectModel(role)

        return await Model.findOne({ email: email })
    }

    // create user (student and teachers) 
    public async createUser(
        accountData: UserAccount, 
        personalData: UserProfile, 
        classData: StudentClass | TeacherClass, 
        role: ValidRoles
    ) {
        const AccountModel = selectModel(role) // Select on StudentAccountModel, TeacherAccountModel
        const PersonalModel = selectPersonalModel(role) // Select on StudentPersonalModel, TeacherPersonalModel
        const ClassModel = selectClassModel(role) // Select on StudentClassModel, TeacherClassModel

        const user = await AccountModel.create(accountData) // Save account on database

        if (role === 'student') {
            const student_class = classData as StudentClass

            await Promise.all([
                PersonalModel.create({ sid: user._id, ...personalData }),
                ClassModel.create({ sid: user._id, ...student_class }),
                GPAModel.create({ 
                    sid: user._id, 
                    quarter: 'q1',
                    gradeLevel: student_class.gradeLevel, 
                    section: student_class.section 
                })
            ])
        }
        
        if (role === 'faculty') {
            const teacher_class = classData as TeacherClass

            await Promise.all([
                PersonalModel.create({ tid: user._id, ...personalData }),
                ClassModel.create({ tid: user._id, ...teacher_class })
            ])
        }

        return {
            message: "User created successfully on database"
        }
    }

    // is user authenticated?
    public authenticated = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user
            const { accessToken } = req.cookies // get access token from cookie on server

            const { role, id } = user
            const Model = selectModel(role)
            const currentUser = await Model.findById(id)

            res.json({ 
                currentUser: currentUser, 
                accessToken: accessToken
            })
        } catch (error) {
            res.status(401).json({ message: 'Token expired' })
        }
        
    }
}

// export const getUserById = (id: string) => UserModel.findById(id)
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)


// export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const users = await getUsers()

//         return res.status(200).json(users)
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }

// export const deleteUser = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const { id } = req.params

//         const deleteUser = await deleteUserById(id)

//         return res.json(deleteUser).sendStatus(200)
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }

// export const updateUser = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const { id } = req.params
//         const { firstname } = req.body

//         if (!firstname) return res.sendStatus(400)

//         const user = await getUserById(id)

//         user.firstname = firstname
//         await user.save()

//         return res.status(200).json(user).end()
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }