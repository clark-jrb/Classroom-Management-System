import { Message, Roles } from "@/types/global.types"
import { api } from "./api"

export const login = async (
    value: any
): Promise<{ userRole: Roles, success: boolean } & Message> => {
    try {
        const response = await api.post(`/auth/login`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error('Error logging in')
    }
}

export const register = async (
    value: any
): Promise<{ userRole: Roles, success: boolean } & Message> => {
    try {
        const response = await api.post(`/auth/register`, value, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
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
        throw new Error('Error logging out')
    }
}