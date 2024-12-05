import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createTask, getTask } from "@/services/TaskService"
import { teacherInfo } from "./useTeacherQueries"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned, section_handled, subjects } = teacherInfo()
    
    const generateTask = useMutation({
        mutationFn: (value: Record<string, any>) => createTask(user_id, value)
    })

    const tasks = useQuery({
        queryKey: ['my_tasks'],
        queryFn: () => getTask({ user_id, grade_assigned, section_handled, subjects })
    })

    if (tasks.isLoading) {
        console.log('loading...')
    }
    if (tasks.isError) {
        console.log('there is an error: ' + tasks.error)
    }
    if (tasks.data) {
        console.log(tasks.data)
    }

    return { generateTask, tasks }
}