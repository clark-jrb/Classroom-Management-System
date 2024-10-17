import { Response, Request } from "express"
import { TeacherModel } from "../models/teacher"

export const verifiedStudent = async (req: Request, res: Response): Promise<any> => {
    const user = (req as any).user
    const currentUser = await getTeacherById(user.id)
    return res.json({ currentUser: currentUser })
}

export const getTeacherById = (id: string) => TeacherModel.findById(id)
