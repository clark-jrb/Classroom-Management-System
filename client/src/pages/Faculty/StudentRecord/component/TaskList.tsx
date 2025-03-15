import { useMyTasks } from "@/hooks/useTaskQuery"
import { useNavigate } from "react-router-dom"
import { GradeLevels, TaskTypes } from "@/types/global.types"
import { TaskUpdate } from "./TaskUpdate"
import { TaskDelete } from "./TaskDelete"
import { toCamelCase } from "@/helpers/camel-case"
import { getGradeName } from "@/helpers/get-quarter"

export const TaskList = ({ taskType, enableEdit, setEnableEdit }: {
    taskType: TaskTypes
    enableEdit: boolean
    setEnableEdit: (state: boolean) => void
}) => {
    const { filterTask } = useMyTasks()
    const navigate = useNavigate()

    const data = filterTask(taskType)

    return (
        <div className="h-auto grid grid-cols-3">
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
                    className="gap-4 w-fit p-4 border-2 border-black-500 mb-3 select-none rounded cursor-pointer"
                    onClick={enableEdit ? undefined : () => navigate(`view/${_id}`)}
                >
                    <div className="flex">
                        <div>{toCamelCase(type)} # {task_no}</div>
                        <div className="border-r"></div>
                        <div>{toCamelCase(subject)}</div>
                        <div>Total items: {total_items}</div>
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
                    <div className="flex">
                        <div>for: {getGradeName(grade as GradeLevels)} - {toCamelCase(section)} </div>
                        <div>{toCamelCase(quarter)}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
