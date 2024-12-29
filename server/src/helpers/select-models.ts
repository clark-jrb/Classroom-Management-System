import { TaskGrade1Model, TaskGrade2Model, TaskGrade3Model, TaskGrade4Model, TaskGrade5Model, TaskGrade6Model } from "models/task"
import { GradeLevels } from "types/TaskTypes"

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