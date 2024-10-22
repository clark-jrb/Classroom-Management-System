import { Response, Request } from "express"
import { UserModel } from "../models/user"
import { StudentModel } from "../models/student"
import { TeacherModel } from "../models/teacher"

export class UserController {

    private selectModel(role: string) {
        const validRoles = ['student', 'faculty', 'admin']

        if (!validRoles.includes(role)) {
            throw new Error(`Invalid role: ${role}`)
        }

        const availableModels: any = {
            student: StudentModel,
            faculty: TeacherModel,
            default: UserModel
        }
        const selectedModel = availableModels[role] || availableModels['default']

        return selectedModel
    }

    // get user by email 
    public async getByEmail(email: string, role: string) {
        const Model = this.selectModel(role)

        return await Model.findOne({ email: email })
    }

    // create user
    public async createUser(values: Record<string, any>, role: string) {
        const Model = this.selectModel(role)
        const user = await new Model(values).save()

        return user.toObject()
    }

    // is user authenticated?
    public authenticated = async (req: Request, res: Response): Promise<any> => {
        const user = (req as any).user;
        const { accessToken } = req.cookies

        const { role, id } = user
        const Model = this.selectModel(role)
        const currentUser = await Model.findById(id);

        return res.json({ 
            currentUser: currentUser, 
            accessToken: accessToken
        });
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