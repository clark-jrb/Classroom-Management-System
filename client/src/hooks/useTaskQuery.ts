import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { teacherClassInfo } from "./useTeacherQuery"
import { 
    createTask, 
    getTasks, 
    createTasksToStudents, 
    updateStudentsScores, 
    getStudentsTakingMyTasks, 
    getStudentsTakingTask, 
    getMyStudentsPerformance,
    createStudentsSGs,
    getStudentsSGs,
    updateStudentsSGs,
    getStudentsCalculatedQA,
    getStudentsQAs,
    getStudentsSGfromQA,
    updateStudentsSGfromQA,
    createStudentsGA,
    getStudentsGA,
    updateTask,
    deleteTask,
} from "@/services/TaskService"
import { 
    TaskTypes, 
    QuarterTypes, 
    SubjectTypes
} from "@/types/global.types"
import { StudentGA, StudentSG } from "@/types/computation.types"
import { TCreateStudentTask, TTaskForm, TTask, TUpdateTask, StudentScore } from "@/types/task.types"

/**
 * Custom hook that returns mutation functions for tasks like UPDATE and CREATE 
 */
export const useTaskMutations = () => {
    const { user_id } = useAuthStore() // grabs id of the current user (IT SHOULD BE TEACHER)
    const { grade_assigned } = teacherClassInfo() // get teacher's assigned grade level of the students
    
    // Generates task (ex. generate recitations)
    const generateTask = useMutation({
        mutationFn: (value: TTaskForm) => createTask(user_id, value)
    })
    
    // Generates task to each student
    const generateTasksToStudents = useMutation({
        mutationFn: (value: TCreateStudentTask) => createTasksToStudents(value),
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
        },
        onError: (error) => {
            console.log('there is an error generating student tasks: ' + error)
        }
    })

    // Updates students scores
    const updateScores = useMutation({
        mutationFn: (value: StudentScore['student_scores']) => updateStudentsScores(value, grade_assigned)
    })

    return { 
        generateTask, 
        generateTasksToStudents,
        updateScores
    }
}

/**
 * Custom hook that updated a specific task
 */
export const useUpdateTask = (id: string) => {
    const updateSpecificTask = useMutation({
        mutationFn: (values: TUpdateTask) => updateTask(id, values)
    })

    return { updateSpecificTask }
}

/**
 * Custom hook that deletes a specific task
 */
export const useDeleteTask = () => {
    const deleteSpecificTask = useMutation({
        mutationFn: (id: string) => deleteTask(id)
    })

    return { deleteSpecificTask }
}

/**
 * Custom hook that returns all teacher's tasks and 
 * then returns the functions that filters the tasks
 * (functions as of now: FILTER and COUNT)
 */
export const useMyTasks = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned, section_handled, subjects } = teacherClassInfo()

    const { data, isError, error } = useSuspenseQuery({ // fetch all tasks created by the teacher
        queryKey: ['my_tasks'],
        queryFn: () => getTasks({ user_id, grade_assigned, section_handled, subjects })
    })

    if (isError) console.log('there is an error getting your tasks', error)
    
    // filters tasks by task type (ex. 'quiz')
    function filterTask(taskType: TaskTypes): TTask[] {
        return data.filter((item) => item.type === taskType)
    }

    // counts existing tasks (ex. "Quizzes" in "English" for section "Whales" during "First" Quarter)
    function countTask(
        taskType: TaskTypes,
        subject: SubjectTypes | '',
        section: string,
        quarter: QuarterTypes
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
 * Custom hook that return all students taking a SPECIFIC task 
 * (ex. "students" taking "quiz no. 2")
 */
export const useStudentTasks = (task_id: string, grade_lvl: string) => {
    const { user_id } = useAuthStore()
    return useQuery({
        queryKey: ['students_taking_task', task_id, grade_lvl],
        queryFn: () => getStudentsTakingTask(user_id, task_id, grade_lvl),
        retry: 1
        // enabled: !!user_id && !!task_id && !!grade_lvl
    })
}

/**
 * Custom hook that return all students taking all of the teacher's tasks
 * (ex. "students" taking "teacher's" given "recitation, quiz, exam, etc.")
 */
export const useStudentsTakingMyTasks = () => {
    const { user_id } = useAuthStore()
    const { grade_assigned } = teacherClassInfo()

    return useSuspenseQuery({
        queryKey: ['students_taking_my_tasks', user_id, grade_assigned],
        queryFn: () => getStudentsTakingMyTasks(user_id, grade_assigned)
    })
}

/**
 * Custom hook that return all students calculated performances
 * (ex. student 1's total "scores" on "quizzes, activity, project, etc.")
 * (ex. total "scores" on quiz 1, quiz 2, and quiz 3)
 */
export const useStudentsPerformance = (section: string, subject: SubjectTypes, quarter: QuarterTypes) => {
    const { user_id } = useAuthStore()
    const { grade_assigned } = teacherClassInfo()

    return useSuspenseQuery({
        queryKey: ['students_performance', user_id, grade_assigned, section, subject, quarter],
        queryFn: () => getMyStudentsPerformance(user_id, grade_assigned, section, subject, quarter)
    })
}

/**
 * Custom hook that returns mutations for 
 * CREATING and UPDATING subject grades
 */
export const useStudentsPerformanceMutations = () => {
    const generateStudentSG = useMutation({
        mutationFn: (value: StudentSG['student_sg']) => createStudentsSGs(value)
    })

    const updateSG = useMutation({
        mutationFn: ({ value, subject, quarter }: { 
            value: StudentSG['student_sg']
            subject: SubjectTypes 
            quarter: QuarterTypes
        }) => updateStudentsSGs(subject, quarter, value)
    })

    function createSG (value: StudentSG['student_sg']) {
        generateStudentSG.mutateAsync(value)
    }

    return {
        createSG, updateSG, generateStudentSG
    }
}

/**
 * Custom hook that returns students subject grades
 */
export const useStudentsSG = (section: string, subject: SubjectTypes) => {
    return useSuspenseQuery({
        queryKey: ['students_subject_grade', section, subject],
        queryFn: () => getStudentsSGs(section, subject)
    })
}

/**
 * Custom hook that returns students quarterly average
 * (subject grades by quarter 1, 2, 3 or 4)
 */
export const useStudentsQA = (grade_lvl: string, section: string) => {
    return useSuspenseQuery({
        queryKey: ['students_qa', grade_lvl, section],
        queryFn: () => getStudentsQAs(grade_lvl, section)
    })
}

/**
 * Custom hook that returns overall quarterly average
 * (average of subject grades by quarter(1,2,3, and 4))
 */
export const useStudentsCalculatedQA = (grade_lvl: string, section: string) => {
    return useSuspenseQuery({
        queryKey: ['students_calculated_qa', grade_lvl, section],
        queryFn: () => getStudentsCalculatedQA(grade_lvl, section)
    })
}

/**
 * Custom hook that returns students subject grade from quarterly average
 * (ex. "Math" grade of students from section "Whales" on quarter 1)
 */
export const useStudentsSGfromQA = (section: string, subject: SubjectTypes) => {
    return useSuspenseQuery({
        queryKey: ['students_sg_from_qa', section, subject],
        queryFn: () => getStudentsSGfromQA(section, subject)
    })
}

/**
 * Custom hook that returns mutations for
 * UPDATING subject grade from 'students_qas' collection
 */
export const useStudentsQAMutations = (section: string, subject: SubjectTypes) => {
    const queryClient = useQueryClient()

    const updateSGfromQA = useMutation({
        mutationFn: (values: StudentSG['student_sg']) => updateStudentsSGfromQA(values),
        onSuccess: (data) => {
            const { message } = data
            console.log(message)
            queryClient.invalidateQueries({ queryKey: ['students_sg_from_qa', section, subject] })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return { updateSGfromQA }
}

/**
 * Custom hook that returns mutations for
 * CREATING general average for students
 */
export const useStudentsGAMutations = () => {
    const generateGeneralAverage = useMutation({
        mutationFn: (value: StudentGA['student_ga']) => createStudentsGA(value)
    })

    return {
        generateGeneralAverage
    }
}

/**
 * Custom hook that returns all students general average
 */
export const useStudentsGA = (section: string) => {
    return useSuspenseQuery({
        queryKey: ['students_ga', section],
        queryFn: () => getStudentsGA(section)
    })
}