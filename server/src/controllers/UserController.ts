import { Request, Response } from "express"
import { selectModel, selectPersonalModel, selectClassModel } from "../helpers/select-models"
import { ValidRoles } from "../types/types"

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
        accountData: Record<string, any>, 
        personalData: Record<string, any>, 
        classData: Record<string, any>, 
        role: ValidRoles
    ) {
        const AccountModel = selectModel(role) // Select on StudentAccountModel, TeacherAccountModel
        const PersonalModel = selectPersonalModel(role) // Select on StudentPersonalModel, TeacherPersonalModel
        const ClassModel = selectClassModel(role) // Select on StudentClassModel, TeacherClassModel

        const user = await AccountModel.create(accountData) // Save account on database
        if (role === 'student') {
            await Promise.all([
                PersonalModel.create({ sid: user._id, ...personalData }),
                ClassModel.create({ sid: user._id, ...classData })
            ])
        }
        if (role === 'faculty') {
            await Promise.all([
                PersonalModel.create({ tid: user._id, ...personalData }),
                ClassModel.create({ tid: user._id, ...classData })
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