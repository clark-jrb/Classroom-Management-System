import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { createTask, getTask, createStudentTasks, updateStudentScores } from "@/services/TaskService"
import { teacherInfo } from "./useTeacherQueries"
import { StudentScore, AllString } from "@/types/types"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned, section_handled, subjects } = teacherInfo()
    
    const generateTask = useMutation({
        mutationFn: (value: Record<string, any>) => createTask(user_id, value)
    })

    const getTasks = useSuspenseQuery({
        queryKey: ['my_tasks'],
        queryFn: () => getTask({ user_id, grade_assigned, section_handled, subjects })
    })

    const tasks = getTasks.data || []
    
    const generateStudentTasks = useMutation({
        mutationFn: (value: Record<string, any>) => createStudentTasks(value),
        onSuccess: (data) => {
            const { message } = data || {}
            console.log(message)
        },
        onError: (error) => {
            console.log('there is an error generating student tasks: ' + error)
        }
    })

    const updateStudentScore = useMutation({
        mutationFn: (value: StudentScore["student_scores"]) => updateStudentScores(value)
    })

    function createTasks({ task_id, grade_lvl, section }: AllString) {
        generateStudentTasks.mutateAsync({ task_id, grade_lvl, section })
    }

    function filterTask(taskType: string) {
        return tasks.filter((item) => item.type === taskType)
    }

    function countTask({taskType, subject, section, quarter}: AllString) {
        return tasks.filter((item) => 
            item.type === taskType && 
            item.subject === subject && 
            item.section === section && 
            item.quarter === quarter
        ).length
    }

    return { generateTask, generateStudentTasks, filterTask, countTask, createTasks, updateStudentScore }
}