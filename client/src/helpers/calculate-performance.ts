import { SpecStudentTask, SubjectTypes, TaskTypes } from "@/types/types"
import { getPercentage } from "./get-percentage"

export function calculatePerformance(sid: string, data: SpecStudentTask[], subject: SubjectTypes, type: TaskTypes) {
    const getScoreAndTotal = data
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

    const sumTotalItems = getScoreAndTotal.reduce((accu, curr) => accu + curr.total_items, 0)
    const sumTotalScores = getScoreAndTotal.reduce((accu, curr) => accu + curr.score, 0)

    const average = sumTotalScores > 0 ? (sumTotalScores / sumTotalItems) * getPercentage(type) : 0

    return average
}