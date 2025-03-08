import { Request, Response } from "express"
import { AdminPolicyModel } from "../models/admin"
import { StudentAccountModel, StudentClassModel, StudentProfileModel } from "../models/student"
import { GeneralAverageModel, QuarterlyAverageModel, SubjectGradeModel } from "../models/computations"
import { selectTaskGradeModel } from "../helpers/select-models"
import { TeacherAccountModel, TeacherClassModel, TeacherProfileModel } from "../models/teacher"
import { TaskModel } from "../models/task"
import { RefreshTokenModel } from "../models/refresh_token"

export class AdminController {

    /**
     * name
     */
    public getCurrentQuarter = async (_req: Request, res: Response) => {
        try {
            const current_quarter = await AdminPolicyModel.find()
            
            if (!current_quarter.length) {
                res.status(404).json({ message: 'Current quarter not found' })
            } else {
                res.status(200).json(current_quarter[0])    // get only the first element
            }
        } catch (error) {
            res.status(400).json({ message: 'Failed to get current quarter' })
        }
    }

    /**
     * name
     */
    public updateCurrentQuarter = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { current_quarter } = req.body

            await AdminPolicyModel.findByIdAndUpdate(
                id, 
                { current_quarter: current_quarter },
                { new: true }
            )

            res.status(200).json({ message: 'Succesfully updated current quarter' })
        } catch (error) {
            res.status(400).json({ message: 'Failed to update current quarter' })
        }
    }

    /**
     * name
     */
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const { id, role } = req.params

            if (role === 'student'){
                const student = await StudentClassModel.findOne({ sid: id })
                const TaskGradeModel = selectTaskGradeModel(student.gradeLevel)

                await Promise.all([
                    StudentAccountModel.findByIdAndDelete(id),
                    StudentProfileModel.findOneAndDelete({ sid: id }),
                    StudentClassModel.findOneAndDelete({ sid: id }),
                    QuarterlyAverageModel.deleteMany({ sid: id }),
                    SubjectGradeModel.deleteMany({ sid: id }),
                    GeneralAverageModel.findOneAndDelete({ sid: id }),
                    TaskGradeModel.deleteMany({ sid: id }),
                    RefreshTokenModel.deleteMany({ user: id })
                ])

                res.status(200).json({ message: 'Successfully deleted student' })
            }

            if (role === 'faculty') {
                await Promise.all([
                    TeacherAccountModel.findByIdAndDelete(id),
                    TeacherProfileModel.findOneAndDelete({ sid: id }),
                    TeacherClassModel.findOneAndDelete({ sid: id }),
                    TaskModel.deleteMany({ sid: id }),
                    RefreshTokenModel.deleteMany({ user: id })
                ])

                res.status(200).json({ message: 'Successfully deleted teacher' })
            }
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete user' })
        }
    }
}