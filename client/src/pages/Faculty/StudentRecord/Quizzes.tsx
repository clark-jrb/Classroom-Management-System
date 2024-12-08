import { TaskForm } from "./component/TaskForm"
import { TaskList } from "./component/TaskList"

export const Quizzes = () => {
  return (
    <div>
      <div className="mb-3">
        <TaskForm taskType="quiz"/>
      </div>
      <TaskList taskType="quiz"/>
    </div>
  )
}
