import { Response, Request } from "express"
import { UserModel } from "../models/user"

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
})

export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save()
    .then((user) => user.toObject())

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