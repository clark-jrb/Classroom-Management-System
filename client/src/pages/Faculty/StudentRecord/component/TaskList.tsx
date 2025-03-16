import { useMyTasks } from "@/hooks/useTaskQuery"
import { useNavigate } from "react-router-dom"
import { TaskTypes } from "@/types/global.types"
import { DataTable } from "./TaskList/data-table"
import { columns } from "./TaskList/columns"
import { TTask } from "@/types/task.types"
import { useState } from "react"
import { TaskDelete } from "./TaskDelete"
import { TaskUpdate } from "./TaskUpdate"

export const TaskList = ({ taskType }: {
    taskType: TaskTypes
}) => {
    const { filterTask } = useMyTasks()
    const navigate = useNavigate()

    const data = filterTask(taskType)

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<TTask | null>(null)

    function handleViewTask(data: TTask) {
        navigate(`view/${data._id}`)
    }

    function openEditDialog(task: TTask) {
        setSelectedTask(task)
        setIsEditOpen(true)
    }

    function openDeleteDialog(task: TTask) {
        setSelectedTask(task)
        setIsDeleteOpen(true)
    }
    
    return (
        <div className="h-auto w-full">
            <DataTable 
                columns={columns(openEditDialog, openDeleteDialog)} 
                data={data} 
                onRowClick={handleViewTask}
                dialogOpen={isEditOpen || isDeleteOpen}
            />

            {selectedTask && (
                <>
                    <TaskDelete 
                        task_id={selectedTask._id} 
                        openDialog={isDeleteOpen} 
                        setOpenDialog={setIsDeleteOpen}
                    />
                    <TaskUpdate 
                        task_id={selectedTask._id} 
                        task_data={{
                            subject: selectedTask.subject,
                            total_items: selectedTask.total_items,
                            task_no: selectedTask.task_no,
                        }} 
                        openDialog={isEditOpen} 
                        setOpenDialog={setIsEditOpen}
                    />
                </>
            )}
        </div>
    )
}
