import { useState } from "react"
import { TaskForm } from "../component/TaskForm"
import { TaskList } from "../component/TaskList"
import { TaskTypes } from "@/types/GlobalTypes"

export const TaskPage = ({ task_type }: {
    task_type: TaskTypes
}) => {
    const [enableEdit, setEnableEdit] = useState(false)
    
    return (
        <div>
            <div className="mb-3">
                <TaskForm taskType={`${task_type}`} enableEdit={enableEdit} setEnableEdit={setEnableEdit}/>
            </div>
            <TaskList taskType={`${task_type}`} enableEdit={enableEdit} setEnableEdit={setEnableEdit}/>
        </div>
    )
}
