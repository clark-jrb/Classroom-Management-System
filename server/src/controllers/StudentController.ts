import { Request, Response } from "express"
import { StudentAccountModel, StudentPersonalModel, StudentClassModel } from "../models/student"
import mongoose from "mongoose"
import { GPAModel } from "../models/computations"

export class StudentController {

    /**
     * addInformation
     */
    // public addInformation = async (req: Request, res: Response): Promise<any> => {
    //     try {
    //         const { id, ...values} = req.body
    //         const student_info = await new StudentPersonalModel({ _id: id, ...values}).save()
            
    //         return res.status(200).json({ student_info: student_info.toObject(), message: 'Successfully added student information' })
    //     } catch (error) {
    //         return res.status(400).json({ message: 'Failed to add information', error })
    //     }
    // }

    public getStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            const students = await StudentAccountModel.find()

            res.status(200).json({ students: students })
        } catch (error) {
            res.status(400).json({ message: 'Failed to get students', error })
        }
    }

    public getStudentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' })
            }

            const [account, personal, classes] = await Promise.all([
                StudentAccountModel.findById(id),
                StudentPersonalModel.findOne({ sid: id }),
                StudentClassModel.findOne({ sid: id }),
            ])
    
            if (!account) {
                res.status(404).json({ message: 'Student cannot be found' })
            }

            res.status(200).json({account, personal, classes})
        } catch (error) {
            res.status(400).json({ message: 'Failed to get student', error })
        }
    }

    public deleteStudentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            await StudentAccountModel.findOneAndDelete({ _id: id })

            res.status(200).json({ message: 'Student successfully deleted' })
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete student', error })
        }
    }
    
    public updateStudentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            const data = req.body

            const student = await StudentAccountModel.findById(id)

            if (!student) {
                res.status(404).json({ message: "Student doesn't exists" })
            }

            const updateStudentInfo = await StudentPersonalModel.findOneAndUpdate(
                { sid: id },
                { $set: data },
                { new: true, runValidators: true }
            )
    
            res.status(200).json({ updateStudentInfo, message: "profile updated successfully!"}).end()
        } catch (error) {
            console.log(error)
            res.sendStatus(400).json({ message: 'Failed to update student', error })
        }
        // return await StudentAccountModel.findByIdAndUpdate(id, values)
    }

    /**
     * GET students by its class
     */
    public getStudentByClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const { gradeLevel, section } = req.query

            const students = await StudentClassModel.find({
                gradeLevel: gradeLevel,
                section: section
            }).populate({
                path: 'sid',
                model: 'students_personals',
                localField: 'sid',
                foreignField: 'sid', 
                select: 'firstname lastname'
            })

            res.status(200).json(students)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to find students', error })
        }
    }

    /**
     * name
     */
    public getStudentGPAs = async (req: Request, res: Response): Promise<void> => {
        try {
            const { sid } = req.params

            const student_gpa = await GPAModel.find({
                sid: sid
            })

            res.status(200).json(student_gpa)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to find student gpa', error })
        }
    }
}