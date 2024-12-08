import { taskFunctions } from "@/hooks/useTaskQueries"

type TaskListProps = {
    taskType: string
}

export const TaskList = ({ taskType }: TaskListProps) => {
    const { filterTask } = taskFunctions()

    type DataProps = {
        [key: string]: string
    }

    const data = filterTask(taskType)

    return (
        <div className="h-auto">
            {data.map(({ 
                _id,
                type,
                task_no,
                grade,
                section,
                subject
            }: DataProps) => (
                <div key={_id} className="border border-black-500 mb-3 select-none">
                    <div>{type} {task_no}</div>
                    <div>{subject}</div>
                    <div>{grade} {section}</div>
                </div>
            ))}
        </div>
    )
}
