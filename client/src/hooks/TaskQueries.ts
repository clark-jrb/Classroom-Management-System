import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { createTask, getTask, createStudentTasks, updateStudentScores } from "@/services/TaskService"
import { teacherInfo } from "./TeacherQueries"
import { StudentScore, TTaskForm, StudentTaskCreate, TaskTypes, QuarterTypes, SubjectTypes, TTasks } from "@/types/types"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    
    const generateTask = useMutation({
        mutationFn: (value: TTaskForm) => createTask(user_id, value)
    })
    
    const generateStudentTasks = useMutation({
        mutationFn: (value: StudentTaskCreate) => createStudentTasks(value),
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
        },
        onError: (error) => {
            console.log('there is an error generating student tasks: ' + error)
        }
    })

    const updateStudentScore = useMutation({
        mutationFn: (value: StudentScore["student_scores"]) => updateStudentScores(value)
    })

    function createTasks({ task_id, grade_lvl, section }: StudentTaskCreate) {
        generateStudentTasks.mutateAsync({ task_id, grade_lvl, section })
    }

    return { 
        generateTask, 
        generateStudentTasks,
        createTasks, 
        updateStudentScore 
    }
}

export const useMyTasks = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned, section_handled, subjects } = teacherInfo()

    const { data, isError, error } = useSuspenseQuery({
        queryKey: ['my_tasks'],
        queryFn: () => getTask({ user_id, grade_assigned, section_handled, subjects })
    })

    if (isError) console.log('there is an error getting your tasks', error)

    const tasks = data
    
    function filterTask(taskType: TaskTypes): TTasks[] {
        return tasks.filter((item) => item.type === taskType)
    }

    function getSpecificTaskTotal(taskType: TaskTypes) {
        return tasks
            .filter((item) => item.type === taskType)
            .map((item) => ({ total_items: item.total_items }))
    }

    function countTask(
        taskType: TaskTypes, 
        subject: SubjectTypes,
        section: string,
        quarter: QuarterTypes
    ): number {
        return tasks.filter((item) => 
            item.type === taskType && 
            item.subject === subject && 
            item.section === section && 
            item.quarter === quarter
        ).length
    }

    return { filterTask, getSpecificTaskTotal, countTask }
}