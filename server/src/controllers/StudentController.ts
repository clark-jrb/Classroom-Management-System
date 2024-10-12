import { StudentModel } from "../models/student"

export const createStudent = (values: Record<string, any>) => new StudentModel(values)
    .save()
    .then((student) => student.toObject())

export const getStudentByEmail = (email: string) => StudentModel.findOne({ email })
