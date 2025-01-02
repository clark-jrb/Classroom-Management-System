import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { teacherInfo } from "./useTeacherQueries"
import { 
    createTask, 
    getTasks, 
    createTasksToStudents, 
    updateStudentsScores, 
    getStudentsTakingMyTasks, 
    getStudentsTakingTask 
} from "@/services/TaskService"
import { 
    StudentScore, 
    TTaskForm, 
    StudentTaskCreate, 
    TaskTypes, 
    QuarterTypes, 
    SubjectTypes, 
    TTasks 
} from "@/types/types"

/**
 * this hook returns functions for tasks like UPDATE and CREATE 
 */
export const useTaskMutations = () => {
    const { user_id } = useAuthStore()          // grabs id of the current user (IT SHOULD BE TEACHER)
    const { grade_assigned } = teacherInfo()    // get teacher's assigned grade level of the students
    
    // generates task (ex. generate recitations)
    const generateTask = useMutation({
        mutationFn: (value: TTaskForm) => createTask(user_id, value)
    })
    
    // generates task to each student
    const generateTasksToStudents = useMutation({
        mutationFn: (value: StudentTaskCreate) => createTasksToStudents(value),
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
        },
        onError: (error) => {
            console.log('there is an error generating student tasks: ' + error)
        }
    })

    // updates students scores
    const updateScores = useMutation({
        mutationFn: (value: StudentScore["student_scores"]) => updateStudentsScores(value, grade_assigned)
    })

    // function to mutate generate tasks to students
    function createTasks({ task_id, grade_lvl, section }: StudentTaskCreate) {
        generateTasksToStudents.mutateAsync({ task_id, grade_lvl, section })
    }

    return { 
        generateTask, 
        generateTasksToStudents,
        updateScores,
        createTasks
    }
}

/**
 * this hook queries to get all teacher's tasks and then returns the functions that filters the tasks
 * (functions as of now: FILTER and COUNT)
 */
export const useMyTasks = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned, section_handled, subjects } = teacherInfo()

    const { data, isError, error } = useSuspenseQuery({ // fetch all tasks created by the teacher
        queryKey: ['my_tasks'],
        queryFn: () => getTasks({ user_id, grade_assigned, section_handled, subjects })
    })

    if (isError) console.log('there is an error getting your tasks', error)
    
    // filters tasks by task type (ex. 'quiz')
    function filterTask(taskType: TaskTypes): TTasks[] {
        return data.filter((item) => item.type === taskType)
    }

    // counts existing tasks (ex. quiz) to determine what task number is next to create
    function countTask(
        taskType: TaskTypes,    //  What TYPE
        subject: SubjectTypes,  //  What SUBJECT
        section: string,        //  What SECTION
        quarter: QuarterTypes   //  What QUARTER
    ): number {
        return data.filter((item) => 
            item.type === taskType && 
            item.subject === subject && 
            item.section === section && 
            item.quarter === quarter
        ).length
    }

    return { filterTask, countTask }
}

/**
 * this query will return all students taking a specific task 
 * (ex. students taking quiz no.2)
 */
export const useStudentTasks = (task_id: string, grade_lvl: string) => {
    return useSuspenseQuery({
        queryKey: ['students_taking_task', task_id, grade_lvl],
        queryFn: () => getStudentsTakingTask(task_id, grade_lvl)
    })
}

/**
 * this query will return all students taking all of the teacher's tasks
 * (ex. students taking teacher's given recitation, quiz, exam, etc.)
 */
export const useStudentsTakingMyTasks = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned } = teacherInfo()

    return useSuspenseQuery({
        queryKey: ['students_taking_my_tasks', user_id],
        queryFn: () => getStudentsTakingMyTasks(user_id, grade_assigned)
    })
}