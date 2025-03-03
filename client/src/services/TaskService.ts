import { 
    StudentPerformance, 
    StudentSGWithProfile, 
    StudentSG, 
    StudentQA, 
    StudentCalculatedQA, 
    StudentGA, 
    StudentGeneralAverage 
} from "@/types/computation.types"
import { api } from "./api"
import { QuarterTypes, SubjectTypes } from "@/types/global.types"
import { Message } from "@/types/global.types"
import { 
    StudentTask,
    StudentTakingTask,
    TCreateStudentTask,
    TTaskForm,
    TTask, 
    TUpdateTask,
    StudentScore
 } from "@/types/task.types"

export const createTask = async (
    tid: string, 
    value: TTaskForm
): Promise<{task: TTask} & Message> => {
    try {
        const response = await api.post(`/task/${tid}`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to create task')
    }
}

export const updateTask = async (
    tid: string, 
    value: TUpdateTask
): Promise<Message> => {
    try {
        const response = await api.patch(`/task/${tid}`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to update specific task')
    }
}

export const deleteTask = async (
    tid: string
): Promise<Message> => {
    try {
        const response = await api.delete(`/task/${tid}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to delete specific task')
    }
}

export const getTasks = async ({ user_id, grade_assigned, section_handled, subjects }: {
    user_id: string
    grade_assigned: string
    section_handled: string[]
    subjects: string[]
}): Promise<TTask[]> => {
    try {
        const response = await api.get('/tasks', {
            params: {
                user_id,
                grade_assigned,
                section_handled,
                subjects
            },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to get tasks')
    }
}

export const createTasksToStudents = async (
    value: TCreateStudentTask
): Promise<Message> => {
    try {
        const response = await api.post(`/tasks/students`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to create tasks to students')
    }
}

export const getStudentsTakingTask = async (
    tid: string,
    task_id: string, 
    grade_lvl: string
): Promise<{ task: TTask, student_tasks: StudentTask[] }> => {
    try {
        const response = await api.get(`/students/task/${tid}`, {
            params: {
                task_id,
                grade_lvl
            },
            withCredentials: true
        })

        return response.data
    } catch (error: any) {
        throw new Error('Client: Failed to get students taking a specific tasks')
    }
}

export const updateStudentsScores = async (
    value: StudentScore["student_scores"], 
    grade_lvl: string
): Promise<Message> => {
    try {
        const response = await api.patch(`/students/scores`, value, {
            params: {
                grade_lvl
            },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to update student scores')
    }
}

export const getStudentsTakingMyTasks = async (
    tid: string, 
    grade_lvl: string
): Promise<StudentTakingTask[]> => {
    try {
        const response = await api.get(`/students/my_tasks`, {
            params: {
                tid,
                grade_lvl
            },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to get students taking my(teacher) tasks')
    }
}

export const getMyStudentsPerformance = async (
    tid: string,
    grade_lvl: string,
    section: string,
    subject: string,
    quarter: string
): Promise<StudentPerformance['student_performance']> => {
    try {
        const response = await api.get(`/students/performance`, {
            params: {
                tid, grade_lvl, section, subject, quarter
            },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Client: Failed to get students performance')
    }
}

export const createStudentsSGs = async (
    value: StudentSG['student_sg']
): Promise<Message> => {
    try {
        const response = await api.post(`/students/sg`, value, {
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Client: Failed to create students subject grade')
    }
}

export const getStudentsSGs = async (
    section: string, 
    subject: SubjectTypes, 
): Promise<StudentSGWithProfile> => {
    try {
        const response = await api.get(`/students/sg`, {
            params: { section, subject },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students subject grade')
    }
}

export const updateStudentsSGs = async (
    subject: SubjectTypes, 
    quarter: QuarterTypes,
    values: StudentSG['student_sg']
): Promise<Message> => {
    try {
        const response = await api.patch(`/students/sg`, values, {
            params: { subject, quarter },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to update students subject grade')
    }
}

export const getStudentsQAs = async (
    grade_lvl: string, 
    section: string
): Promise<StudentQA[]> => {
    try {
        const response = await api.get(`/students/qa`, {
            params: { grade_lvl, section },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students quarterly average')
    }
}

export const getStudentsCalculatedQA = async (
    grade_lvl: string, 
    section: string
): Promise<StudentCalculatedQA[]> => {
    try {
        const response = await api.get(`/students/calculated/qa`, {
            params: { grade_lvl, section },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students calculated quarterly average')
    }
}


export const getStudentsSGfromQA = async (
    section: string, 
    subject: SubjectTypes, 
): Promise<StudentSGWithProfile> => {
    try {
        const response = await api.get(`/students/qa/sg`, {
            params: { section, subject },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students subject grade from QA')
    }
}

export const updateStudentsSGfromQA = async (
    values: StudentSG['student_sg'],
): Promise<Message> => {
    try {
        const response = await api.patch(`/students/qa/sg`, values, {
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to update students subject grade from quarterly average data')
    }
}

export const createStudentsGA = async (
    value: StudentGA['student_ga']
): Promise<Message> => {
    try {
        const response = await api.post(`/students/ga`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to create students general average')
    }
}

export const getStudentsGA = async (
    section: string
): Promise<StudentGA['student_ga']> => {
    try {
        const response = await api.get(`/students/ga`, {
            params: { section },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get students general average')
    }
}

export const getStudentGA = async (
    sid: string
): Promise<StudentGeneralAverage> => {
    try {
        const response = await api.get(`/student/ga/${sid}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get general average')
    }
}