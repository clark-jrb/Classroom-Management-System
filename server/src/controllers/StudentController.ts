import { Request, Response } from "express"
import { StudentAccountModel, StudentProfileModel, StudentClassModel } from "../models/student"
import mongoose from "mongoose"
import { QuarterlyAverageModel } from "../models/computations"

export class StudentController {

    public getStudents = async (_req: Request, res: Response) => {
        try {
            const students = await StudentAccountModel.find()
            // const getStudentId = students.map(student => student._id)

            const students_data = await Promise.all(
                students.map(async ({ _id }) => {
                    const [account, profile, classes] = await Promise.all([
                        StudentAccountModel
                            .findById(_id)
                            .select('-password -__v')
                            .lean(),
                        StudentProfileModel
                            .findOne({ sid: _id })
                            .select('-_id -sid -__v')
                            .lean(),
                        StudentClassModel
                            .findOne({ sid: _id })
                            .select('-_id -sid -__v')
                            .lean(),
                    ])

                    return { 
                        ...account, 
                        ...profile, 
                        ...classes 
                    }
                })
            )

            res.status(200).json(students_data)
        } catch (error) {
            res.status(400).json({ message: 'Failed to get students', error })
        }
    }

    public getStudentById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' })
            }

            const [account, profile, classes] = await Promise.all([
                StudentAccountModel.findById(id),
                StudentProfileModel.findOne({ sid: id }).select('-_id -sid -__v'),
                StudentClassModel.findOne({ sid: id }).select('-_id -sid -__v'),
            ])
    
            if (!account) {
                res.status(404).json({ message: 'Student cannot be found' })
            }

            res.status(200).json({account, profile, classes})
        } catch (error) {
            res.status(400).json({ message: 'Failed to get student', error })
        }
    }

    public deleteStudentById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            await StudentAccountModel.findOneAndDelete({ _id: id })

            res.status(200).json({ message: 'Student successfully deleted' })
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete student', error })
        }
    }
    
    public updateStudentById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data = req.body

            const student = await StudentAccountModel.findById(id)

            if (!student) {
                res.status(404).json({ message: "Student doesn't exists" })
            }

            await StudentProfileModel.findOneAndUpdate(
                { sid: id },
                { $set: data },
                { new: true, runValidators: true }
            )
    
            res.status(200).json({ message: "Profile updated successfully" }).end()
        } catch (error) {
            console.log(error)
            res.sendStatus(400).json({ message: 'Failed to update student', error })
        }
        // return await StudentAccountModel.findByIdAndUpdate(id, values)
    }

    /**
     * GET students by its class
     */
    public getStudentByClass = async (req: Request, res: Response) => {
        try {
            const { gradeLevel, section } = req.query

            const students = await StudentClassModel.find({
                gradeLevel: gradeLevel,
                section: section
            }).populate({
                path: 'sid',
                model: 'students_profiles',
                localField: 'sid',
                foreignField: 'sid'
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
    public getStudentQAs = async (req: Request, res: Response) => {
        try {
            const { sid } = req.params
            const quarters = ['q1', 'q2', 'q3', 'q4']

            const student_qas = await QuarterlyAverageModel.find({
                sid: sid
            })

            const sorted_qas = student_qas.sort((a, b) => quarters.indexOf(a.quarter) - quarters.indexOf(b.quarter))

            res.status(200).json(sorted_qas)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to find student qa', error })
        }
    }
}