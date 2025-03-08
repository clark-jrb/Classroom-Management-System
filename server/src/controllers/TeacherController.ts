import { Request, Response } from "express"
import { TeacherAccountModel, TeacherProfileModel, TeacherClassModel } from "../models/teacher"
import mongoose from "mongoose"

export class TeacherController {

    /**
     * GET TEACHERS
     */
    public getTeachers = async (_req: Request, res: Response): Promise<void> =>{
        try {
            const teachers = await TeacherAccountModel.find()

            const teachers_data = await Promise.all(
                teachers.map(async ({ _id }) => {
                    const [account, profile, classes] = await Promise.all([
                        TeacherAccountModel
                            .findById(_id)
                            .select('-password -__v')
                            .lean(),
                            TeacherProfileModel.findOne({ tid: _id })
                            .select('-_id -tid -__v')
                            .lean(),
                        TeacherClassModel
                            .findOne({ tid: _id })
                            .select('-_id -tid -__v')
                            .lean()
                            .then((data) => ({
                                ...data,
                                section_handled: data.section_handled.join(", "),
                                subjects: data.subjects.join(", ")
                            })),
                    ])

                    return { 
                        ...account, 
                        ...profile, 
                        ...classes 
                    }
                })
            )

            res.status(200).json(teachers_data)
        } catch (error) {
            res.status(400).json({ message: 'Failed to get teachers', error })
        }
    }

    /**
     * GET TEACHER BY ID
     */
    public getTeacherById = async (req: Request, res: Response): Promise<void> =>  {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
            }

            const [account, profile, classes] = await Promise.all([
                TeacherAccountModel.findById(id),
                TeacherProfileModel.findOne({ tid: id }),
                TeacherClassModel.findOne({ tid: id }),
            ]);
    
            if (!account) {
                res.status(404).json({ message: 'Teacher cannot be found' });
            }

            res.status(200).json({account, profile, classes})
        } catch (error) {
            res.status(400).json({ message: 'Failed to get teacher', error })
        }
    }

    /**
     * DELETE TEACHER BY ID
     */
    public deleteTeacherById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            await TeacherAccountModel.findOneAndDelete({ _id: id })

            res.status(200).json({ message: 'Teacher successfully deleted' })
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete teacher', error })
        }
    }

    /**
     * UPDATE TEACHER BY ID
     */
    public updateTeacherById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            const data = req.body

            const teacher = await TeacherAccountModel.findById(id)
            
            if (!teacher) {
                res.status(404).json({ message: "Teacher doesn't exists" })
            }

            await TeacherProfileModel.findOneAndUpdate(
                { tid: id },
                { $set: data },
                { new: true, runValidators: true }
            )
    
            res.status(200).json({ message: "Profile updated successfully!"}).end()
        } catch (error) {
            console.log(error)
            res.sendStatus(400).json({ message: 'Failed to update teacher', error })
        }
    }
}