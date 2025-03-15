import { TaskForm } from "../component/TaskForm"
import { TaskList } from "../component/TaskList"
import { TaskTypes } from "@/types/global.types"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const TaskPage = ({ task_type }: {
    task_type: TaskTypes
}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <div className="flex gap-2">
                <div>
                    <Button variant={'ghost'} onClick={() => navigate('/records')}>
                        <ArrowLeft/>
                    </Button>
                </div>
                <div className="mb-3">
                    <TaskForm taskType={`${task_type}`}/>
                </div>
            </div>
            <TaskList taskType={`${task_type}`}/>
        </div>
    )
}
