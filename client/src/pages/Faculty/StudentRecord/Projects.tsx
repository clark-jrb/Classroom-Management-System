import { TaskForm } from "./component/TaskForm"
import { TaskList } from "./component/TaskList"

export const Projects = () => {
    return (
        <div>
            <div className="mb-3">
                <TaskForm taskType="project"/>
            </div>
            <TaskList taskType="project"/>
        </div>
    )
}
