import { useMyTasks } from "@/hooks/useTaskQuery"
import { useNavigate } from "react-router-dom"
import { TaskTypes } from "@/types/global.types"
import { DataTable } from "./TaskList/data-table"
import { columns } from "./TaskList/columns"
import { TTask } from "@/types/task.types"

export const TaskList = ({ taskType }: {
    taskType: TaskTypes
}) => {
    const { filterTask } = useMyTasks()
    const navigate = useNavigate()

    const data = filterTask(taskType)

    function handleViewTask(data: TTask) {
        navigate(`view/${data._id}`)
    }

    return (
        <div className="h-auto w-full">
            <DataTable columns={columns} data={data} onRowClick={handleViewTask}/>
        </div>
    )
}
