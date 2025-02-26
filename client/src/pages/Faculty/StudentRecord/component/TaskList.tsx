import { useMyTasks } from "@/hooks/useTaskQueries"
import { useNavigate } from "react-router-dom"
import { TaskTypes } from "@/types/GlobalTypes"

export const TaskList = ({ taskType }: {
    taskType: TaskTypes
}) => {
    const { filterTask } = useMyTasks()
    const navigate = useNavigate()

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
            }) => (
                <div 
                    key={_id} 
                    className="flex gap-4 w-1/2 p-4 border border-black-500 mb-3 select-none rounded cursor-pointer"
                    onClick={() => navigate(`view/${_id}`)}
                >
                    <div>{section} {grade}</div>
                    <div>{type} No. {task_no}</div>
                    <div>{subject}</div>
                </div>
            ))}
        </div>
    )
}
