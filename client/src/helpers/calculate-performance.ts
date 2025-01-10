import { QuarterTypes, StudentTakingTask, SubjectTypes, TaskTypes } from "@/types/types"
import { getWeightWithoutProject, getWeightWithProject } from "./get-weight"
import { findProject } from "./is-there-a-project"

export function calculatePerformance(
    sid: string, 
    data: StudentTakingTask[], 
    subject: SubjectTypes, 
    type: TaskTypes,
    quarter: QuarterTypes,
    gradeLvl: string,
    section: string
) {
    const ScoresAndTotals = data
        .filter((item) => 
                item.sid === sid &&
                item.task_id.subject === subject &&
                item.task_id.type === type &&
                item.task_id.quarter === quarter
            )
        .map((item) => ({
            sid: item.sid,
            total_items: item.task_id.total_items,
            score: item.score
        }))

    const isThereAProject = findProject(data, gradeLvl, section, subject)

    const sumTotalItems = ScoresAndTotals.reduce((accu, curr) => accu + curr.total_items, 0)
    const sumTotalScores = ScoresAndTotals.reduce((accu, curr) => accu + curr.score, 0)

    const performance = sumTotalScores > 0 ? 
        (sumTotalScores / sumTotalItems) * (
            isThereAProject ? 
            getWeightWithProject(type) : 
            getWeightWithoutProject(type)
        ) : 0

    return performance
}