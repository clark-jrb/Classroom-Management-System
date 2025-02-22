import { StudentCalculatedQA, StudentGA, StudentQA, StudentSG, StudentSGWithProfile, StudentPerformance } from "@/types/ComputationTypes";
import { api } from "./api";
import { QuarterTypes, StudentScore, SubjectTypes } from "@/types/GlobalTypes";
import { TTasks, TTaskForm, Message, StudentTask, StudentTaskCreate, StudentTakingTask } from "@/types/GlobalTypes";

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
        throw new Error('Client: Failed to create task')
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
        throw new Error('Client: Failed to get tasks')
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
        throw new Error('Client: Failed to create tasks to students')
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
): Promise<StudentGA['student_ga']> => {
    try {
        const response = await api.get(`/student/ga/${sid}`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Failed to get general average')
    }
}