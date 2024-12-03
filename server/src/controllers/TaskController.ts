import { Response, Request } from "express"
import { TaskModel } from "../models/task"
import mongoose from "mongoose"

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
}