import { TaskForm } from "../component/TaskForm"
import { TaskList } from "../component/TaskList"

export const Recitations = () => {
    return (
        <div>
            <div className="mb-3">
                <TaskForm taskType="recitation"/>
            </div>
            <TaskList taskType="recitation"/>
        </div>
    )
}
