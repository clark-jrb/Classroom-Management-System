import { Request, Response } from "express"
import { TeacherModel, TeacherInfoModel, TeacherClassModel } from "../models/teacher"
import mongoose from "mongoose"

export class TeacherController {

    /**
     * GET TEACHERS
     */
    public getTeachers = async (req: Request, res: Response): Promise<void> =>{
        try {
            const teachers = await TeacherModel.find()

            res.status(200).json({ teachers: teachers })
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

            const [account, personal, classes] = await Promise.all([
                TeacherModel.findById(id),
                TeacherInfoModel.findOne({ tid: id }),
                TeacherClassModel.findOne({ tid: id }),
            ]);
    
            if (!account) {
                res.status(404).json({ message: 'Teacher cannot be found' });
            }

            res.status(200).json({account, personal, classes})
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
            await TeacherModel.findOneAndDelete({ _id: id })

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

            const teacher = await TeacherModel.findById(id)
            if (!teacher) res.status(404).json({ message: "Teacher doesn't exists" })

            const updateTeacherInfo = await TeacherInfoModel.findOneAndUpdate(
                { tid: id },
                { $set: data },
                { new: true, runValidators: true }
            )
    
            res.status(200).json({ updateTeacherInfo, message: "profile updated successfully!"}).end()
        } catch (error) {
            console.log(error)
            res.sendStatus(400).json({ message: 'Failed to update teacher', error })
        }
    }
}