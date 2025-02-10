import { StudentCalculatedGPA, StudentGPA, StudentGWA, StudentGWAWithProfile, StudentPerformance } from "@/types/computationTypes";
import { api } from "./api";
import { QuarterTypes, StudentScore, SubjectTypes } from "@/types/types";
import { TTasks, TTaskForm, Message, StudentTask, StudentTaskCreate, StudentTakingTask } from "@/types/types";

export const createTask = async (
    tid: string, 
    value: TTaskForm
): Promise<{task: TTasks} & Message> => {
    try {
        const response = await api.post(`/task/${tid}`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to create a new task')
    }
}

export const getTasks = async (
    filters: Record<string, string | string[]>
): Promise<TTasks[]> => {
    try {
        const query = new URLSearchParams(filters as Record<string, string>).toString()
        const response = await api.get(`/tasks?${query}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get tasks')
    }
}

export const createTasksToStudents = async (
    value: StudentTaskCreate
): Promise<Message> => {
    try {
        const response = await api.post(`/tasks/students`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to create tasks to students')
    }
}

export const getStudentsTakingTask = async (
    task_id: string, 
    grade_lvl: string
): Promise<StudentTask[]> => {
    try {
        const response = await api.get(`/students/task`, {
            params: {
                task_id,
                grade_lvl
            },
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get students taking tasks')
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
        throw new Error('Failed to update student scores')
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
        throw new Error('Failed to get students taking my tasks')
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
        throw new Error('Failed to get students performance')
    }
}

export const createMyStudentsGWA = async (
    value: StudentGWA['student_gwa']
): Promise<Message> => {
    try {
        const response = await api.post(`/students/gwa`, value, {
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to create students gwa')
    }
}

export const getMyStudentsGWA = async (
    section: string, 
    subject: SubjectTypes, 
): Promise<StudentGWAWithProfile> => {
    try {
        const response = await api.get(`/students/gwa`, {
            params: { section, subject },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students gwa')
    }
}

export const updateMyStudentsGWA = async (
    subject: SubjectTypes, 
    quarter: QuarterTypes,
    values: StudentGWA['student_gwa']
): Promise<Message> => {
    try {
        const response = await api.patch(`/students/gwa`, values, {
            params: { subject, quarter },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to update students gwa')
    }
}

export const getMyStudentsGPAs = async (
    grade_lvl: string, 
    section: string
): Promise<StudentGPA[]> => {
    try {
        const response = await api.get(`/students/gpa`, {
            params: { grade_lvl, section },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students gpa')
    }
}

export const getMyStudentsCalculatedGPAs = async (
    grade_lvl: string, 
    section: string
): Promise<StudentCalculatedGPA[]> => {
    try {
        const response = await api.get(`/students/calculated/gpa`, {
            params: { grade_lvl, section },
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        throw new Error('Failed to get students gpa')
    }
}