import { useMyTasks } from "@/hooks/useTaskQuery"
import { useNavigate } from "react-router-dom"
import { TaskTypes } from "@/types/global.types"
import { TaskUpdate } from "./TaskUpdate"
import { TaskDelete } from "./TaskDelete"

export const TaskList = ({ taskType, enableEdit, setEnableEdit }: {
    taskType: TaskTypes
    enableEdit: boolean
    setEnableEdit: (state: boolean) => void
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
                subject,
                total_items,
                quarter
            }) => (
                <div 
                    key={_id} 
                    className="flex gap-4 w-fit p-4 border-2 border-black-500 mb-3 select-none rounded cursor-pointer"
                    onClick={enableEdit ? undefined : () => navigate(`view/${_id}`)}
                >
                    <div>{section} {grade}</div>
                    <div>{type} No. {task_no}</div>
                    <div>{subject}</div>
                    <div>Total items: {total_items}</div>
                    <div>{quarter}</div>
                    {enableEdit &&
                        <div className="flex gap-2">
                            <TaskUpdate 
                                task_id={_id} 
                                task_data={{ subject, total_items, task_no }} 
                                setEnableEdit={setEnableEdit}
                            />
                            <TaskDelete 
                                task_id={_id} 
                                setEnableEdit={setEnableEdit}
                            />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}
