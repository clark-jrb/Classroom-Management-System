import { TeacherModel } from "../models/teacher"

export const createTeacher = (values: Record<string, any>) => new TeacherModel(values)
    .save()
    .then((teacher) => teacher.toObject())

export const getTeacherByEmail = (email: string) => TeacherModel.findOne({ email })
