import { useMyTasks } from "@/hooks/useTaskQueries"
import { useNavigate } from "react-router-dom"
import { TaskTypes } from "@/types/GlobalTypes"
import { CircleX, Pencil } from "lucide-react"
import { useEffect } from "react"

export const TaskList = ({ taskType, enableEdit }: {
    taskType: TaskTypes
    enableEdit: boolean
}) => {
    const { filterTask } = useMyTasks()
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(enableEdit)
    }, [enableEdit])


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
                    className="flex gap-4 w-fit p-4 border border-black-500 mb-3 select-none rounded cursor-pointer"
                    onClick={() => navigate(`view/${_id}`)}
                >
                    <div>{section} {grade}</div>
                    <div>{type} No. {task_no}</div>
                    <div>{subject}</div>
                    <div className="flex gap-2">
                        <Pencil size={'20px'}/>
                        <CircleX size={'20px'}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
