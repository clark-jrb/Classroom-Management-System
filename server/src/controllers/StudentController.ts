import { Response, Request } from "express"
import { StudentModel, StudentInfoModel } from "../models/student"
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
            const sid = new mongoose.Types.ObjectId(id)

            const student = await StudentModel.aggregate([
                { $match: { _id: sid } },
                {
                    $lookup: {
                        from: "students_infos", // Ensure this matches your actual collection name
                        localField: "email",
                        foreignField: "email",
                        as: "student_info"
                    }
                },
                { $unwind: { path: "$student_info" } }
            ]);

            if (student.length === 0) {
                const studentNoInfo = await StudentModel.findById(id);
                return res.status(200).json(studentNoInfo);
            }

            return res.status(200).json(student[0] || [])
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

                // console.log(student[0].email)

            const updateStudentInfo = await StudentInfoModel.findOneAndUpdate(
                { email: student.email },
                { $set: data },
                { new: true, runValidators: true }
            )

            // console.log("student id: " + id)
            // console.log(data)
            // console.log("existing student: " + findUser)
    
            // if (!firstname) return res.sendStatus(400)
    
            // const user = await StudentModel.findByIdAndUpdate(id)
    
            // user.firstname = firstname
            // await user.save()
    
            return res.status(200).json({ updateStudentInfo, message: "profile updated successfully!"}).end()
        } catch (error) {
            console.log(error)
            return res.sendStatus(400)
        }
        // return await StudentModel.findByIdAndUpdate(id, values)
    }
}