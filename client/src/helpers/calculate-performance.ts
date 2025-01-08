import { SpecStudentTask, SubjectTypes, TaskTypes } from "@/types/types"
import { getWeightWithoutProject, getWeightWithProject } from "./get-weight"

export function calculatePerformance(
    sid: string, 
    data: SpecStudentTask[], 
    subject: SubjectTypes, 
    type: TaskTypes
) {
    const ScoresAndTotals = data
        .filter((item) => 
                item.sid === sid &&
                item.task_id.subject === subject &&
                item.task_id.type === type
            )
        .map((item) => ({
            sid: item.sid,
            total_items: item.task_id.total_items,
            score: item.score
        }))

    const isThereAProject = data.filter((item) => item.task_id.type === 'project').length > 0

    const sumTotalItems = ScoresAndTotals.reduce((accu, curr) => accu + curr.total_items, 0)
    const sumTotalScores = ScoresAndTotals.reduce((accu, curr) => accu + curr.score, 0)

    const performance = sumTotalScores > 0 ? (sumTotalScores / sumTotalItems) * (isThereAProject ? getWeightWithProject(type) : getWeightWithoutProject(type)) : 0

    return performance
}