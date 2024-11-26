import { Response, Request } from "express"
import { StudentModel, StudentInfoModel, StudentClassModel } from "../models/student"
import mongoose, { mongo } from "mongoose"

export class StudentController {

    /**
     * addInformation
     */
    public addInformation = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id, ...values} = req.body
            const student_info = await new StudentInfoModel({ _id: id, ...values}).save()
            
            return res.status(200).json({ student_info: student_info.toObject(), message: 'Successfully added student information' })
        } catch (error) {
            return res.status(400).json({ message: 'Failed to add information', error })
        }
    }

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

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const [account, personal, classes] = await Promise.all([
                StudentModel.findById(id),
                StudentInfoModel.findOne({ sid: id }),
                StudentClassModel.findOne({ sid: id }),
            ]);
    
            if (!account) {
                return res.status(404).json({ message: 'Student cannot be found' });
            }

            return res.status(200).json({account, personal, classes})
        } catch (error) {
            return res.status(400).json({ message: 'Failed to get student', error })
        }
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
    
    public updateStudentById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params
            const data = req.body

            const student = await StudentModel.findById(id)
            if (!student) return res.status(404).json({ message: "Student doesn't exists" })

            const updateStudentInfo = await StudentInfoModel.findOneAndUpdate(
                { sid: id },
                { $set: data },
                { new: true, runValidators: true }
            )
    
            return res.status(200).json({ updateStudentInfo, message: "profile updated successfully!"}).end()
        } catch (error) {
            console.log(error)
            return res.sendStatus(400).json({ message: 'Failed to update student', error })
        }
        // return await StudentModel.findByIdAndUpdate(id, values)
    }
}