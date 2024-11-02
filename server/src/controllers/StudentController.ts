import { Response, Request } from "express"
import { StudentModel, StudentInfoModel } from "../models/student"

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
            // const student = await StudentModel.findById(id)
            // const student_info = await StudentInfoModel.findOne({ sid: id })

            const student = await StudentModel.aggregate([
                { $match: { _id: id } },
                {
                    $lookup: {
                        from: "student_infos", // the name of the student info collection in MongoDB
                        localField: "_id",
                        foreignField: "_id",
                        as: "studentInformation"
                    }
                },
                { $unwind: "$studentInformation" } // optional: to flatten the array if there's only one related student_info
            ]);

            console.log(student)

            return res.status(200).json(student)
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