import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createTask, getTask, createStudentTasks } from "@/services/TaskService"
import { teacherInfo } from "./useTeacherQueries"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned, section_handled, subjects } = teacherInfo()
    
    const generateTask = useMutation({
        mutationFn: (value: Record<string, any>) => createTask(user_id, value)
    })

    const generateStudentTasks = useMutation({
        mutationFn: (value: Record<string, any>) => createStudentTasks(value),
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
        },
        onError: (error) => {
            console.log('there is an error generating student tasks: ' + error)
        }
    })

    const getTasks = useQuery({
        queryKey: ['my_tasks'],
        queryFn: () => getTask({ user_id, grade_assigned, section_handled, subjects })
    })

    type TaskFunctionProps = {
        [key: string]: string
    }

    type StudentTaskProps = {
        [key: string]: string
    }

    function createTasks({ task_id, grade_lvl, section }: StudentTaskProps) {
        generateStudentTasks.mutateAsync({ task_id, grade_lvl, section })
    }

    // const tasks = getTasks.data || {}
    function filterTask(taskType: string) {
        return getTasks.data?.filter((item: any) => item.type === taskType)
    }

    function countTask({taskType, subject, section, quarter}: TaskFunctionProps) {
        return getTasks.data?.filter((item: any) => 
            item.type === taskType && 
            item.subject === subject && 
            item.section === section && 
            item.quarter === quarter
        ).length
    }

    return { generateTask, generateStudentTasks, filterTask, countTask, createTasks }
}