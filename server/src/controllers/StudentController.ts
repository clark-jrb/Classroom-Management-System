import { Response, Request } from "express"
import { StudentModel } from "../models/student"

export const verifiedStudent = async (req: Request, res: Response): Promise<any> => {
    const user = (req as any).user
    const currentUser = await getStudentById(user.id)
    return res.json({ currentUser: currentUser })
}

export const getStudentById = (id: string) => StudentModel.findById(id)
export const getStudents = () => StudentModel.find()

export const getAllStudents = async (req: Request, res: Response): Promise<any> => {
    try {
        const students = await getStudents()

        return res.status(200).json(students)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}