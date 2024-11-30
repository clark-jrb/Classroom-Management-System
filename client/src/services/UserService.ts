
import { apiClient } from "./api";

const server_url = import.meta.env.VITE_SERVER_URL

export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get(`${server_url}/authenticated`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch current user', error)
    }
}

export const getStudentInformation = async (id: string) => {
    try {
        const response = await apiClient.get(`${server_url}/student/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch student information', error)
    }
}

export const getTeacherInformation = async (id: string) => {
    try {
        const response = await apiClient.get(`${server_url}/teacher/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Failed to fetch student information', error)
    }
}