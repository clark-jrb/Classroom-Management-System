import { Response, Request } from "express"
import { UserModel } from "../models/user"
import { getStudentById } from "./StudentController"
import { StudentModel } from "../models/student"
import { TeacherModel } from "../models/teacher"

export const authenticated = async (req: Request, res: Response): Promise<any> => {
    const user = (req as any).user
    const currentUser = await getStudentById(user.id)
    return res.json({ currentUser: currentUser })
}

export class UserFactory {
    public email: string
    public id: string
    public role: string

    private selectModel(role: string) {
        const validRoles = ['student', 'teacher', 'admin']

        if (!validRoles.includes(role)) {
            throw new Error(`Invalid role: ${role}`)
        }

        const availableModels: any = {
            student: StudentModel,
            teacher: TeacherModel,
            default: UserModel
        }
        const selectedModel = availableModels[role] || availableModels['default']

        return selectedModel
    }

    // get users 
    //
    public getUsers(role: string) {
        const Model = this.selectModel(role)

        return Model.find()
    }

    // get user by email 
    //
    public getByEmail(email: string, role: string) {
        const Model = this.selectModel(role)

        return Model.findOne({ email: email })
    }

    // create user 
    //
    public async createUser(values: Record<string, any>, role: string) {
        const Model = this.selectModel(role)
        const user = await new Model(values).save()

        return user.toObject()
    }
}

export const getUserById = (id: string) => UserModel.findById(id)
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)


// export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const users = await getUsers()

//         return res.status(200).json(users)
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const deleteUser = await deleteUserById(id)

        return res.json(deleteUser).sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { firstname } = req.body

        if (!firstname) return res.sendStatus(400)

        const user = await getUserById(id)

        user.firstname = firstname
        await user.save()

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}