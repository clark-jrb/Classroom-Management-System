import { api } from "./api"

export const login = async (value: any): Promise<any> => {
    try {
        const response = await api.post(`/auth/login`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Error logging in', error)
    }
}

export const register = async (value: any): Promise<any> => {
    try {
        const response = await api.post(`/auth/register`, value, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Error register', error)
    }
}

export const refreshAccessToken = async () => {
    try {
        const response = await api.post(`/auth/refresh`, {}, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error('Error refreshing access token', error)
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await api.post(`/auth/logout`, {}, {
            withCredentials: true
        })
        const { message } = response.data
        return message
    } catch (error) {
        console.error('Error logging out', error)
    }
}