import { Response, Request } from "express"
import { StudentModel } from "../models/student"

export class StudentController {

    public getStudents = async (req: Request, res: Response): Promise<any> => {
        try {
            const students = await StudentModel.find()

            return res.status(200).json({ students: students })
        } catch (error) {
            return res.status(400).json({ message: 'Failed to get students', error })
        }
    }

    public getStudentById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params
            const student = await StudentModel.findById(id)

            return res.status(200).json({ student: student })
        } catch (error) {
            return res.status(400).json({ message: 'Failed to get student', error })
        }
        // return await StudentModel.findById(id)
    }

    public deleteStudentById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params
            await StudentModel.findOneAndDelete({ _id: id })

            return res.status(200).json({ message: 'Student successfully deleted' })
        } catch (error) {
            return res.status(400).json({ message: 'Failed to delete student', error })
        }
    }
    
    public async updateUserById(id: string, values: Record<string, any>) {
        return await StudentModel.findByIdAndUpdate(id, values)
    }
}