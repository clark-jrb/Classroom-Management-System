import { taskFunctions } from "@/hooks/useTaskQueries"
import { useNavigate } from "react-router-dom"
import { TaskTypes } from "@/types/types"

export const TaskList = ({ taskType }: {
    taskType: TaskTypes
}) => {
    const { filterTask } = taskFunctions()
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
