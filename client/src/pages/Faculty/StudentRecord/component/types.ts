
type Task = {
    total_items: number
}

type StudentInfo = {
    sid: string,
    firstname: string,
    lastname: string
}

export type StudentTask = {
    _id: string
    score: number,
    sid: StudentInfo,
    task_id: Task
}