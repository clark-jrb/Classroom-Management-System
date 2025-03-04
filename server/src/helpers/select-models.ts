import { StudentClassModel, StudentProfileModel, StudentAccountModel } from "../models/student"
import { TeacherClassModel, TeacherProfileModel, TeacherAccountModel } from "../models/teacher"
import { TaskGrade1Model, TaskGrade2Model, TaskGrade3Model, TaskGrade4Model, TaskGrade5Model, TaskGrade6Model } from "../models/task"
import { ValidRoles, GradeLevels } from "../types/types"
import { AdminAccountModel } from "../models/admin"

export const selectTaskGradeModel = (grade: GradeLevels) => {
    const selectedModel = {
        grade_1: TaskGrade1Model,
        grade_2: TaskGrade2Model,
        grade_3: TaskGrade3Model,
        grade_4: TaskGrade4Model,
        grade_5: TaskGrade5Model,
        grade_6: TaskGrade6Model,
    }

    return selectedModel[grade]
}

export const selectAccountModel = (role: ValidRoles) => {
    const selectedModel: any = {
        student: StudentAccountModel,
        faculty: TeacherAccountModel,
        admin: AdminAccountModel
    }

    return selectedModel[role]
}

export const selectProfileModel = (role: ValidRoles) => {
    const selectedModel: any = {
        student: StudentProfileModel,
        faculty: TeacherProfileModel
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
