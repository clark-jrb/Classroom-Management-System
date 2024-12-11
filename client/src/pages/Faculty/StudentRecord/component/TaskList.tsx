import { taskFunctions } from "@/hooks/useTaskQueries"
import { useNavigate } from "react-router-dom"

type TaskListProps = {
    taskType: string
}

export const TaskList = ({ taskType }: TaskListProps) => {
    const { filterTask } = taskFunctions()
    const navigate = useNavigate()

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
                <div 
                    key={_id} 
                    className="border border-black-500 mb-3 select-none rounded cursor-pointer"
                    onClick={() => navigate(`view/${_id}`)}
                >
                    <div>{type} {task_no}</div>
                    <div>{subject}</div>
                    <div>{grade} {section}</div>
                </div>
            ))}
        </div>
    )
}
