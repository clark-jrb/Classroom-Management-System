import { userProfileSchema } from "@/schemas/user.schema"
import { StudentSG, StudentSGWithProfile } from "@/types/computation.types"
import { StudentScore, TUpdateTask } from "@/types/task.types"
import { z } from "zod"


export function getChangedFields(
    existingData: z.infer<typeof userProfileSchema>,
    newData: z.infer<typeof userProfileSchema>
) {
    const changes: Record<string, any> = {}

    Object.keys(existingData).forEach((key) => {
        const existValue = existingData[key as keyof typeof existingData]
        const newValue = newData[key as keyof typeof newData]

        // Compare values, handling date formatting if needed
        const existingValueCurrent = existValue instanceof Date ? existValue.getTime() : existValue
        const newValueCurrent = newValue instanceof Date ? newValue.getTime() : newValue

        if (existingValueCurrent !== newValueCurrent) {
            changes[key] = newValue
        }

    })

    return changes
}


export function getChangedScores(
    originalScores: StudentScore['student_scores'],
    newScores: StudentScore['student_scores']
) {
    if (!originalScores || originalScores.length !== newScores.length) {
        throw new Error("Both arrays must have the same length")
    }

    const changedScores = newScores.filter((newItem, index) => {
        const originalItem = originalScores[index]
        return newItem.score !== originalItem.score
    })

    return changedScores.map(({ _id, score }) => ({ _id, score }))
}


export function getChangedSG(
    oldSG: StudentSGWithProfile,
    newSG: StudentSG['student_sg']
) {
    if (!oldSG || oldSG.length !== newSG.length) {
        throw new Error("Both arrays must have the same length")
    }

    const changedScores = newSG.filter((newItem) => {
        // const originalItem = oldSG[index]
        const originalItem = oldSG.find(original => original.sid.sid === newItem.sid)
        return originalItem && newItem.subj_grade !== originalItem.subj_grade
    })

    return changedScores.map((data) => (data))
}

export function getTaskChanges(
    originalTask: TUpdateTask,
    newTask: TUpdateTask
) {

    const hasChanged = Object
        .keys(originalTask)
        .every(key => originalTask[key as keyof typeof originalTask] === newTask[key as keyof typeof newTask])

    return hasChanged
}



