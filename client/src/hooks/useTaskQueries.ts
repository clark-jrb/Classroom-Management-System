import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { createTask, getTask, createStudentTasks, updateStudentScores, getSpecificStudentTask, getStudentTask } from "@/services/TaskService"
import { teacherInfo } from "./useTeacherQueries"
import { StudentScore, TTaskForm, StudentTaskCreate, TaskTypes, QuarterTypes, SubjectTypes, TTasks, SpecStudentTask } from "@/types/types"
import { getPercentage } from "@/helpers/get-percentage"

export const taskFunctions = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned } = teacherInfo()
    
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
        mutationFn: (value: StudentScore["student_scores"]) => updateStudentScores(value, grade_assigned)
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

    return { filterTask, countTask }
}

export const useStudentTasks = (task_id: string, grade_lvl: string) => {
    return useSuspenseQuery({
        queryKey: ['student_tasks', task_id, grade_lvl],
        queryFn: () => getStudentTask(task_id, grade_lvl)
    })
}

export const useSpecificStudentTask = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned } = teacherInfo()
    return useSuspenseQuery({
        queryKey: ['spec_student_tasks', user_id],
        queryFn: () => getSpecificStudentTask(user_id, grade_assigned)
    })
}

export function calculateAverage(sid: string, data: SpecStudentTask[], subject: SubjectTypes, type: TaskTypes) {
    const getScoreAndTotal = data
        .filter((item) => 
                item.sid === sid &&
                item.task_id.subject === subject &&
                item.task_id.type === type
            )
        .map((item) => ({
            sid: item.sid,
            total_items: item.task_id.total_items,
            score: item.score
        }))

    const sumTotalItems = getScoreAndTotal.reduce((accu, curr) => accu + curr.total_items, 0)
    const sumTotalScores = getScoreAndTotal.reduce((accu, curr) => accu + curr.score, 0)

    const average = sumTotalScores > 0 ? (sumTotalScores / sumTotalItems) * getPercentage(type) : 0

    return average
}