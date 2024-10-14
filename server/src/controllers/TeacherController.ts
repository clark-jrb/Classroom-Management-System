import { Response, Request } from "express"
import { TeacherModel } from "../models/teacher"

export const verifiedStudent = async (req: Request, res: Response): Promise<any> => {
    const user = (req as any).user
    const currentUser = await getTeacherById(user.id)
    return res.json({ currentUser: currentUser })
}

export const createTeacher = (values: Record<string, any>) => new TeacherModel(values)
    .save()
    .then((teacher) => teacher.toObject())

export const getTeacherByEmail = (email: string) => TeacherModel.findOne({ email })
export const getTeacherById = (id: string) => TeacherModel.findById(id)
