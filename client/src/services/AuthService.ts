import { Message } from "@/types/types"
import { api } from "./api"

export const login = async (
    value: any
): Promise<{ userRole: string } & Message> => {
    try {
        const response = await api.post(`/auth/login`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Error logging in', error)
        throw new Error('Error logging in')
    }
}

export const register = async (
    value: any
): Promise<{ userRole: string } & Message> => {
    try {
        const response = await api.post(`/auth/register`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Error register', error)
        throw new Error('Error register')
    }
}

export const refreshAccessToken = async (): Promise<Message> => {
    try {
        const response = await api.post(`/auth/refresh`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        // console.error('Error refreshing access token', error)
        throw new Error('Error refreshing access token lol')
    }
}

export const logout = async (): Promise<Message> => {
    try {
        const response = await api.post(`/auth/logout`, {
            withCredentials: true
        })
        const { message } = response.data
        return message
    } catch (error) {
        console.error('Error logging out', error)
        throw new Error('Error logging out')
    }
}