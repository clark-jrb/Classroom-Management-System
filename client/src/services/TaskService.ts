import { api } from "./api";
import { StudentScore } from "@/types/types";
import { TTasks, TTaskForm, Message, StudentTask, StudentTaskCreate } from "@/types/types";

export const createTask = async (id: string, value: TTaskForm): Promise<{task: TTasks} & Message> => {
    try {
        const response = await api.post(`/task/${id}`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create a new task', error)
        throw new Error('Failed to create a new task')
    }
}

export const getTask = async (filters: Record<string, string | string[]>): Promise<TTasks[]> => {
    try {
        const query = new URLSearchParams(filters as Record<string, string>).toString()
        // console.log(query)
        const response = await api.get(`/task?${query}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get tasks', error)
        throw new Error('Failed to get tasks')
    }
}

export const createStudentTasks = async (value: StudentTaskCreate): Promise<Message> => {
    try {
        const response = await api.post(`/task/students/create`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create student tasks', error)
        throw new Error('Failed to create student tasks')
    }
}

export const getStudentTask = async (id: string): Promise<StudentTask[]> => {
    try {
        const response = await api.get(`/task/students/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get students tasks', error)
        throw new Error('Failed to get students tasks')
    }
}

export const updateStudentScores = async (value: StudentScore["student_scores"]): Promise<Message> => {
    try {
        const response = await api.patch(`/task/students/update`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to update student scores user', error)
        throw new Error('Failed to update student scores user')
    }
}