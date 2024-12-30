import { StudentClassModel, StudentInfoModel, StudentModel } from "models/student"
import { TeacherClassModel, TeacherInfoModel, TeacherModel } from "models/teacher"
import { TaskGrade1Model, TaskGrade2Model, TaskGrade3Model, TaskGrade4Model, TaskGrade5Model, TaskGrade6Model } from "../models/task"
import { ValidRoles, GradeLevels } from "types/types"

export const selectTaskGradeModel = (grade: GradeLevels) => {
    const selectedModel: any = {
        grade_1: TaskGrade1Model,
        grade_2: TaskGrade2Model,
        grade_3: TaskGrade3Model,
        grade_4: TaskGrade4Model,
        grade_5: TaskGrade5Model,
        grade_6: TaskGrade6Model,
    }

    return selectedModel[grade]
}

export const selectModel = (role: ValidRoles) => {
    const selectedModel: any = {
        student: StudentModel,
        faculty: TeacherModel
    }

    return selectedModel[role]
}

export const selectPersonalModel = (role: ValidRoles) => {
    const selectedModel: any = {
        student: StudentInfoModel,
        faculty: TeacherInfoModel
    }

    return selectedModel[role]
}

export const selectClassModel = (role: ValidRoles) => {
    const selectedModel: any = {
        student: StudentClassModel,
        faculty: TeacherClassModel
    }

    return selectedModel[role]
}
