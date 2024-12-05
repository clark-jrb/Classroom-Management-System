import { Response, Request } from "express"
import { TaskModel } from "../models/task"
import mongoose, { Types } from "mongoose"

export class TaskController {
    /**
     * CREATE Task
     */
    public createTask = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params
            const data = req.body

            const newTask = await TaskModel.create({
                tid: id,
                ...data
            })

            res.status(200).json({ newTask, message: 'New task succesfully created' })
        } catch (error) {
            return res.status(400).json({ message: 'Failed to create task', error })
        }
    }

    /**
     * FIND task
     */
    public findTask = async (req: Request, res: Response): Promise<any> => {
        try {
            const { user_id, grade_assigned, section_handled, subjects } = req.query

            const sectionsArray = typeof section_handled === 'string'
                ? section_handled.split(',')
                : section_handled
            
            const subjectsArray = typeof subjects === 'string'
                ? subjects.split(',')
                : subjects

            const myTasks = await TaskModel.find({
                tid: user_id,
                grade: grade_assigned,
                section: { $in: sectionsArray },
                subject: { $in: subjectsArray }
            })

            res.status(200).json(myTasks)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Failed to find tasks', error })
        }
    }
}