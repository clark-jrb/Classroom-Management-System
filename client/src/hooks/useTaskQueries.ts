import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { createTask, getTask, createStudentTasks, updateStudentScores, getMyStudentsWithMyTasks, getStudentTask } from "@/services/TaskService"
import { teacherInfo } from "./useTeacherQueries"
import { StudentScore, TTaskForm, StudentTaskCreate, TaskTypes, QuarterTypes, SubjectTypes, TTasks } from "@/types/types"

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

/**
 * this query will get all the teacher's students that takes his/her given tasks
 */
export const useStudentsWithMyTasks = () => {
    const { user_id } = useAuthStore()          // grab the user_id of current user of the application (TEACHER)
    const { grade_assigned } = teacherInfo()    // get teacher's assigned grade level of students

    return useSuspenseQuery({
        queryKey: ['my_students_with_tasks', user_id],
        queryFn: () => getMyStudentsWithMyTasks(user_id, grade_assigned)
    })
}