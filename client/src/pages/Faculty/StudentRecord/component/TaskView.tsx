import { useParams } from "react-router-dom"
import { getStudentTask } from "@/services/TaskService"
import { useSuspenseQuery } from "@tanstack/react-query"

export const TaskView = () => {
    const { taskId } = useParams() 
    
    const { data, isLoading, isError, error } = useSuspenseQuery({
        queryKey: ['student_tasks', taskId],
        queryFn: () => getStudentTask(taskId as string)
    })

    if (isLoading) {
        console.log('loading...')
    }

    if (isError) {
        console.log(error)
    }

    if (data) {
        console.log(data)
    }

    return (
        <div>TaskView</div>
    )
}
