import { SubjectTypes } from "@/types/global.types"
import { StudentTakingTask } from "@/types/task.types"

export function findProject(
    data: StudentTakingTask[],
    grade_level: string,
    section: string,
    subject: SubjectTypes
) {
    return data.filter((item) => 
        item.task_id.type === 'project' &&
        item.task_id.grade === grade_level &&
        item.task_id.section === section &&
        item.task_id.subject === subject // maybe i should add quarter
    ).length > 0
}