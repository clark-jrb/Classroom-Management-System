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
    public role: string

    constructor(email: string, role: string) {
        this.email = email
        this.role = role

        const validRoles = [
            'student',
            'teacher',
            'admin'
        ]

        if (!validRoles.includes(role)) {
            throw new Error(`Invalid role: ${role}`)
        }
    }

    private selectModel () {
        const availableModels: any = {
            student: StudentModel,
            teacher: TeacherModel,
            default: UserModel
        }
        const selectedModel = availableModels[this.role] || availableModels['default']
        
        return selectedModel
    }

    // get user by email 
    public getByEmail() {
        const Model = this.selectModel()

        return Model.findOne({ email: this.email })
    }

    // create user 
    //
    public async createUser(values: Record<string, any>) {
        const Model = this.selectModel()
        const user = await new Model(values).save()

        return user.toObject()
    }
}

export const getUsers = () => UserModel.find()
// export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const getUserById = (id: string) => UserModel.findById(id)
// export const createUser = (values: Record<string, any>) => new UserModel(values)
//     .save()
//     .then((user) => user.toObject())

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)


export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUsers()

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

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