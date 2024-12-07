import { Response, Request } from "express"
import { TaskModel, StudentTaskModel } from "../models/task"
import { StudentClassModel } from "../models/student"
import mongoose, { Types } from "mongoose"
import { forEach } from "lodash"

export class TaskController {
    /**
     * CREATE Task (for teacher)
     */
    public createTask = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params
            const data = req.body

            const newTask = await TaskModel.create({
                tid: id,
                ...data
            })

            res.status(200).json({ task: newTask, message: 'New task succesfully created' })
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

    /**
     * CREATE student tasks
     */
    public createStudentTasks = async (req: Request, res: Response): Promise<any> => {
        try {
            const { task_id, grade_lvl, section } = req.body

            console.log({ task_id, grade_lvl, section })
            console.log(typeof grade_lvl)

            const findStudents = await StudentClassModel.find({
                gradeLevel: grade_lvl,
                section: section
            })

            console.log(findStudents)

            if (!findStudents) {
                console.log('there is no students')
                return res.status(400).json({ message: 'there is no existing students' })
            } else {
                console.log('students exists')
                findStudents.forEach(async (student) => {
                    try {
                        await StudentTaskModel.create({
                            sid: student.sid,
                            task_id: task_id,
                            score: 0
                        })
                        console.log('successfully created')
                    } catch (error) {
                        console.log('error creating tasks ' + error)
                    }
                })

                return res.status(200).json({ message: 'succcesfully created student tasks' })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Failed to find tasks', error })
        }
    }
}