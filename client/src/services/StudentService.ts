import { apiClient } from "./api";

const server_url = import.meta.env.VITE_SERVER_URL

export const updateStudentInfo = async (id: string, value: Record<string, any>): Promise<any> => {
    try {
        const response = await apiClient.post(`${server_url}/student/${id}`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch current user', error)
    }
}