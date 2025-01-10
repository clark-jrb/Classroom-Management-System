import { StudentTakingTask } from "@/types/types";

export function findProject(
    data: StudentTakingTask[],
    grade_level: string,
    section: string
) {
    return data.filter((item) => 
        item.task_id.type === 'project' &&
        item.task_id.grade === grade_level &&
        item.task_id.section === section
    ).length > 0
}