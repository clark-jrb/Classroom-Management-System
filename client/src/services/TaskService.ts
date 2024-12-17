import { api } from "./api";
import { StudentScore } from "@/types/types";

export const createTask = async (id: string, value: Record<string, any>): Promise<any> => {
    try {
        const response = await api.post(`/task/${id}`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create a new task', error)
    }
}

export const getTask = async (filters: Record<string, string>): Promise<any> => {
    try {
        const query = new URLSearchParams(filters as Record<string, string>).toString()
        // console.log(query)
        const response = await api.get(`/task?${query}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get tasks', error)
    }
}

export const createStudentTasks = async (value: Record<string, any>): Promise<any> => {
    try {
        const response = await api.post(`/task/students/create`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create student tasks', error)
    }
}

export const getStudentTask = async (id: string): Promise<any> => {
    try {
        const response = await api.get(`/task/students/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to get students tasks', error)
    }
}

export const updateStudentScores = async (value: StudentScore["student_scores"]): Promise<any> => {
    try {
        const response = await api.patch(`/task/students/update`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch current user', error)
    }
}