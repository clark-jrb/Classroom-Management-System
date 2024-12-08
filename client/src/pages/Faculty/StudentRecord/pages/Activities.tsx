import { TaskForm } from "../component/TaskForm"
import { TaskList } from "../component/TaskList"

export const Activities = () => {
    return (
        <div>
            <div className="mb-3">
                <TaskForm taskType="activity"/>
            </div>
            <TaskList taskType="activity"/>
        </div>
    )
}
