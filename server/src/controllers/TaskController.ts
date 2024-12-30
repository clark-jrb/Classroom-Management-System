import { RequestHandler } from "express"
import { TaskModel } from "../models/task"
import { StudentClassModel } from "../models/student"
import { StudentTask, Task } from "../types/TaskTypes"
import { GradeLevels } from "../types/types"
import { selectTaskGradeModel } from "../helpers/select-models"

export class TaskController {
    /**
     * CREATE Task (for teacher)
     */
    public createTask: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params
            const data = req.body

            const newTask: Task = await TaskModel.create({
                tid: id,
                ...data
            })

            res.status(200).json({ task: newTask, message: 'New task succesfully created' })
        } catch (error) {
            res.status(400).json({ message: 'Failed to create task', error })
        }
    }

    /**
     * GET task
     */
    public getTasks: RequestHandler = async (req, res) => {
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
            res.status(400).json({ message: 'Failed to find tasks', error })
        }
    }

    /**
     * CREATE student tasks
     */
    public createTasksToStudents: RequestHandler = async (req, res) => {
        try {
            const { task_id, grade_lvl, section } = req.body
            const Model = selectTaskGradeModel(grade_lvl)

            const findStudents = await StudentClassModel.find({
                gradeLevel: grade_lvl,
                section: section
            })

            if (!findStudents) {
                console.log('there is no students')
                res.status(400).json({ message: 'there is no existing students' })
            } else {
                findStudents.forEach(async (student) => {
                    try {
                        await Model.create({
                            sid: student.sid,
                            task_id: task_id,
                            score: 0
                        })
                    } catch (error) {
                        console.log('error creating tasks ' + error)
                    }
                })

                res.status(200).json({ message: 'succcesfully created student tasks' })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to find tasks', error })
        }
    }
    
    /**
     * GET students taking a specific task
     * this will return all the students taking the specific task
     * ex. task_id is quiz no. 2 (this will return ALL students taking the quiz no.2)
     */
    public getStudentsTakingTask: RequestHandler = async (req, res) =>  {
        try {
            const { task_id, grade_lvl } = req.query
            const Model = selectTaskGradeModel(grade_lvl as GradeLevels)

            const studentTasks = await Model.find({ task_id: task_id })
                .populate({
                    path: 'sid',
                    model: 'students_info',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })
                .populate('task_id')

            res.status(200).json(studentTasks)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to find tasks', error })
        }
    }

    /**
     * UPDATE students scores
     */
    public updateStudentScore: RequestHandler = async (req, res) => {
        try {
            const { grade_lvl } = req.query
            const studentScores: StudentTask[] = req.body
            const Model = selectTaskGradeModel(grade_lvl as GradeLevels)

            studentScores.forEach(async (data) => {
                try {
                    await Model.findByIdAndUpdate(
                        data._id,
                        { score: data.score },
                        { new: true, runValidators: true }
                    )
                    // console.log('score updated successfuly')
                    res.status(200).json({ message: 'scores updated successfuly' })
                } catch (error) {
                    console.log('error updating scores ' + error)
                }
            })
            
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to update scores', error })
        }
    }

    /**
     * GET students taking teacher's tasks
     * this will return all of the students of a specific grade level taking the teacher's tasks
     * (tasks can be recitation, quiz, activity, etc.)
     */
    public getStudentsTakingMyTasks: RequestHandler = async (req, res) => {
        try {
            const { tid, grade_lvl } = req.query

            const Model = selectTaskGradeModel(grade_lvl as GradeLevels)

            const findTasks = await Model.find().populate('task_id')

            const studentTasks = findTasks.filter((task: any) => task.task_id.tid.toString() === tid)

            res.status(200).json(studentTasks)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Failed to find tasks', error })
        }
    }
}