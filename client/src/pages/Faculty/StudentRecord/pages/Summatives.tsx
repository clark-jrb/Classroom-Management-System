import { TaskForm } from "../component/TaskForm"
import { TaskList } from "../component/TaskList"

export const Summatives = () => {
    return (
        <div>
            <div className="mb-3">
                <TaskForm taskType="summative"/>
            </div>
            <TaskList taskType="summative"/>
        </div>
    )
}
