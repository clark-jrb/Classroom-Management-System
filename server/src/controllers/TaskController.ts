import { Request, Response } from "express"
import { TaskModel } from "../models/task"
import { StudentClassModel } from "../models/student"
import { StudentsGWAs, StudentTaskScore, Task, TaskTypes } from "../types/TaskTypes"
import { GradeLevels } from "../types/types"
import { selectTaskGradeModel } from "../helpers/select-models"
import { getWeightWithoutProject, getWeightWithProject } from "../helpers/get-weight"
import { UserProfile } from "../types/UserTypes"
import { GeneralAverageModel, QuarterlyAverageModel, SubjectGradeModel } from "../models/computations"

export class TaskController {
    /**
     * CREATE Task (for teacher)
     */
    public createTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tid } = req.params
            const data = req.body

            const newTask = await TaskModel.create({
                tid: tid,
                ...data
            })

            res.status(201).json({ 
                task: newTask, 
                message: 'New task succesfully created' 
            })
        } catch (error) {
            res.status(400).json({ 
                message: 'Failed to create task', error 
            })
        }
    }

    /**
     * GET task
     */
    public getTasks = async (req: Request, res: Response): Promise<void> => {
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
            res.status(400).json({ 
                message: 'Failed to get tasks', error 
            })
        }
    }

    /**
     * CREATE student tasks
     */
    public createTasksToStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            const { task_id, grade_lvl, section } = req.body
            const Model = selectTaskGradeModel(grade_lvl)

            const findStudents = await StudentClassModel.find({
                gradeLevel: grade_lvl,
                section: section
            })

            if (!findStudents) {
                console.log('There is no students')
                res.status(400).json({ message: 'There is no existing students' })
            } else {
                findStudents.forEach(async (student) => {
                    try {
                        await Model.create({
                            sid: student.sid,
                            task_id: task_id,
                            score: 0
                        })
                    } catch (error) {
                        console.log('Error creating tasks to students' + error)
                    }
                })

                res.status(200).json({ 
                    message: 'Succcesfully created tasks to students' 
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to create tasks to students', error 
            })
        }
    }
    
    /**
     * GET students taking a specific task
     * this will return all the students taking the specific task
     * ex. task_id is quiz no. 2 (this will return ALL students taking the quiz no.2)
     */
    public getStudentsTakingTask = async (req: Request, res: Response): Promise<void> =>  {
        try {
            const { task_id, grade_lvl } = req.query
            const Model = selectTaskGradeModel(grade_lvl as GradeLevels)

            const studentTasks = await Model.find({ task_id: task_id })
                .populate({
                    path: 'sid',
                    model: 'students_profiles',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })
                .populate('task_id')

            res.status(200).json(studentTasks)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get students taking specific task', error 
            })
        }
    }

    /**
     * UPDATE students scores
     */
    public updateStudentsScores = async (req: Request, res: Response): Promise<void> => {
        try {
            const { grade_lvl } = req.query
            const StudentsScores: StudentTaskScore[] = req.body
            const Model = selectTaskGradeModel(grade_lvl as GradeLevels)

            for (const student of StudentsScores) {
                try {
                    await Model.findByIdAndUpdate(
                        student._id,
                        { score: student.score },
                        { new: true, runValidators: true }
                    );
                    console.log(`Score of student ${student._id} updated successfully`);
                } catch (error) {
                    console.log(`Error updating score of student ${student._id}: ${error}`);
                    // Optional: Track failed updates in a separate list to send back in the response
                }
            }
    
            res.status(200).json({ 
                message: 'All student scores updated successfully' 
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to update students scores', error 
            })
        }
    }

    /**
     * GET students taking teacher's tasks
     * this will return all of the students of a specific grade level taking the teacher's tasks
     * (tasks can be recitation, quiz, activity, etc.)
     */
    public getStudentsTakingMyTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tid, grade_lvl } = req.query

            const Model = selectTaskGradeModel(grade_lvl as GradeLevels)

            const findTasks = await Model.find().populate<{ task_id: Task }>('task_id')

            const studentTasks = findTasks.filter((task) => task.task_id.tid.toString() === tid)

            res.status(200).json(studentTasks)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: `Failed to find students taking teacher's tasks`, error 
            })
        }
    }

    /**
     * name
     */
    public getMyStudentsPerformance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tid, grade_lvl, section, subject, quarter } = req.query

            const my_students = await StudentClassModel
                .find({
                    gradeLevel: grade_lvl,
                    section: section
                })
                .populate<{ sid: UserProfile }>({
                    path: 'sid',
                    model: 'students_profiles',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })
            //  pick grade level first (selection of model)
            const TaskGradeModel = selectTaskGradeModel(grade_lvl as GradeLevels)
            const studentsTakingMyTasks = await TaskGradeModel.find()
                .populate<{ task_id: Task }>('task_id')    //  populate task_id to get task description
                .then((tasks) => 
                    tasks
                        .filter((task) => 
                            task.task_id.tid.toString() === tid &&  //  filter by teacher ID
                            task.task_id.subject === subject &&     //  filter by subject
                            task.task_id.quarter === quarter &&     //  filter by subject
                            task.task_id.section === section        //  filter by section
                        )
                        .map((task) => ({     //  map by:
                            sid: task.sid.toString(),               //  sid,
                            score: task.score,                      //  score
                            type: task.task_id.type,                //  type,
                            task_no: task.task_id.task_no,          //  task_no,
                            total_items: task.task_id.total_items   //  total_items
                        }))
                )

            const isThereAProject = studentsTakingMyTasks.filter((item) => 
                item.type === 'project').length > 0

            const studentsTasks = my_students.map(({ sid: { sid, firstname, lastname } }) => {
                const getSumsOfTask = (type: TaskTypes) => {
                    const result = studentsTakingMyTasks
                        .filter((item) => item.sid === sid.toString() && item.type === type)
                        .reduce(
                            (accu: { score: number; totalItems: number }, curr) => {
                                return {
                                    score: accu.score + curr.score,
                                    totalItems: accu.totalItems + curr.total_items,
                                }
                            },
                            { score: 0, totalItems: 0 }
                        )

                    return result.score > 0 && result.totalItems > 0 
                        ? ((result.score / result.totalItems) * (isThereAProject 
                            ? getWeightWithProject(type) 
                            : getWeightWithoutProject(type))) 
                        : 0
                }
                
                return {
                    sid,
                    firstname,
                    lastname,
                    recitation: getSumsOfTask('recitation'),
                    activity: getSumsOfTask('activity'),
                    quiz: getSumsOfTask('quiz'),
                    project: getSumsOfTask('project'),
                    summative: getSumsOfTask('summative'),
                    exam: getSumsOfTask('exam')
                }
            })

            const data = studentsTasks.length > 0 
                ? studentsTasks 
                : []

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get students performance', error 
            })
        }
    }

    /**
     * create
     */
    public createStudentsSGs = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = req.body
            
            await SubjectGradeModel.create(data)

            res.status(200).json({ message: 'Success creating students subject grade' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to create students subject grade', error 
            })
        }
    }

    /**
     * name
     */
    public getStudentsSGs = async (req: Request, res: Response): Promise<void> => {
        try {
            const { section, subject } = req.query
            
            const students_sg = await SubjectGradeModel.find({ section: section, subject: subject })
                .populate({
                    path: 'sid',
                    model: 'students_profiles',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })

            res.status(200).json(students_sg)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get students subject grade', error 
            })
        }
    }

    public updateStudentsSGs = async (req: Request, res: Response): Promise<void> => {
        try {
            const { subject, quarter } = req.query
            const StudentsScores: StudentsGWAs[] = req.body

            await Promise.all(
                StudentsScores.map(async (student) => {
                    try {
                        await SubjectGradeModel.findOneAndUpdate(
                            { sid: student.sid, subject, quarter },
                            { gwa: student.gwa },
                            { new: true, runValidators: true }
                        );
                        console.log(`${subject} grade for student ${student.sid} updated successfully`)
                    } catch (error) {
                        console.error(`Error updating ${subject} grade for student ${student.sid}:`, error)
                    }
                })
            );
    
            res.status(200).json({ 
                message: `All students ${subject} grade updated successfully`
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to update students subject grade', error 
            })
        }
    }

    public getStudentsQAs = async (req: Request, res: Response): Promise<void> => {
        try {
            const { grade_lvl, section } = req.query
            
            const students_qa = await QuarterlyAverageModel.find({ gradeLevel: grade_lvl, section: section })
                .populate({
                    path: 'sid',
                    model: 'students_profiles',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })

            res.status(200).json(students_qa)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to create students quarterly average', error 
            })
        }
    }

    public getStudentsCalculatedQA = async (req: Request, res: Response): Promise<void> => {
        try {
            const { grade_lvl, section } = req.query

            const students_qa = await QuarterlyAverageModel.find({ gradeLevel: grade_lvl, section: section })
            const quarters = ['q1', 'q2', 'q3', 'q4']
            const total_quarters = quarters.length

            const students_total_qa = await StudentClassModel
                .find({ gradeLevel: grade_lvl, section: section })
                .populate<({ sid: UserProfile })>({
                    path: 'sid',
                    model: 'students_profiles',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })
                .then((student) => 
                    student.map(({ sid: { sid, firstname, lastname } }) => ({
                        sid,
                        firstname,
                        lastname,
                        total_qa: students_qa
                            .filter(item => item.sid.toString() === sid.toString())
                            .reduce((accu, curr) => {
                                    return {
                                        math: accu.math + curr.math / total_quarters,
                                        science: accu.science + curr.science / total_quarters,
                                        english: accu.english + curr.english / total_quarters,
                                        filipino: accu.filipino + curr.filipino / total_quarters,
                                        hekasi: accu.hekasi + curr.hekasi / total_quarters,
                                        mapeh: accu.mapeh + curr.mapeh / total_quarters
                                    }
                                },
                                { 
                                    english: 0,
                                    math: 0,
                                    filipino: 0,
                                    mapeh: 0,
                                    hekasi: 0,
                                    science: 0
                                }
                            )
                    }))
                )

            res.status(200).json(students_total_qa)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get students calculated quarterly average', error 
            })
        }
    }
    
    public getStudentsSGfromQA = async (req: Request, res: Response): Promise<void> => {
        try {
            const { section, subject } = req.query
            
            const students_qas = await QuarterlyAverageModel.find({ section: section })
                .select(`sid ${subject} quarter section`)
                .populate({
                    path: 'sid',
                    model: 'students_profiles',
                    localField: 'sid',
                    foreignField: 'sid', 
                    select: 'firstname lastname'
                })
                .lean()

            const format_students_qas = students_qas.map(data => ({
                _id: data._id,
                sid: data.sid,
                quarter: data.quarter,
                section: section,
                subject: subject,
                gwa: data[subject as keyof typeof data]
            }))

            res.status(200).json(format_students_qas)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get students subject grade from QA', error 
            })
        }
    }

    public updateStudentsSGfromQA = async (req: Request, res: Response): Promise<void> => {
        try {
            const StudentsScores: StudentsGWAs[] = req.body

            await Promise.all(
                StudentsScores.map(async (student) => {
                    try {
                        await QuarterlyAverageModel.findOneAndUpdate(
                            { 
                                sid: student.sid, 
                                section: student.section, 
                                quarter: student.quarter 
                            },
                            { [student.subject]: student.gwa },
                            { new: true, runValidators: true }
                        );
                        console.log(`Subject ${student.subject} grade of student ${student.sid} updated successfully`)
                    } catch (error) {
                        console.error(`Error updating subject ${student.subject} grade of student ${student.sid}: `, error)
                    }
                })
            );
    
            res.status(200).json({ 
                message: 'All students subject grade from quarterly average data updated successfully' 
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to update students subject grade from quarterly average data', error 
            })
        }
    }

    public createStudentsGA = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = req.body

            await GeneralAverageModel.create(data)

            res.status(201).json({
                message: 'Students general average succesfully created' 
            })
        } catch (error) {
            res.status(400).json({ 
                message: 'Failed to create students general average', error 
            })
        }
    }

    public getStudentsGA = async (req: Request, res: Response): Promise<void> => {
        try {
            const { section } = req.query
            
            const students_ga = await GeneralAverageModel.find({ section: section })

            res.status(200).json(students_ga)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get students general average', error 
            })
        }
    }

    public getStudentGA = async (req: Request, res: Response): Promise<void> => {
        try {
            const { sid } = req.params
            
            const student_ga = await GeneralAverageModel.findOne({ sid: sid })

            res.status(200).json(student_ga)
        } catch (error) {
            console.log(error)
            res.status(400).json({ 
                message: 'Failed to get student general average', error 
            })
        }
    }
}