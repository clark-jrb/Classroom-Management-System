import { apiClient } from "./api";

export const createTask = async (id: string, value: Record<string, any>): Promise<any> => {
    try {
        const response = await apiClient.post(`/task/${id}`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to create a new task', error)
    }
}