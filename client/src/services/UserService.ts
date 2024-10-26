
import { apiClient } from "./api";

const server_url = import.meta.env.VITE_SERVER_URL

export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get(`${server_url}/authenticated`, {
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log('Failed to fetch current user', error)
    }
}