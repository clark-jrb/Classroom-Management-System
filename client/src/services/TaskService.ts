import { api } from "./api";

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