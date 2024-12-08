import { TaskForm } from "./component/TaskForm"
import { TaskList } from "./component/TaskList"

export const Exams = () => {
    return (
        <div>
            <div className="mb-3">
                <TaskForm taskType="exam"/>
            </div>
            <TaskList taskType="exam"/>
        </div>
    )
}
