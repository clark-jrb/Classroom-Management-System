import axios from "axios";
import { refreshAccessToken } from "./AuthService";

/**
 * this apiClient is only for making http requests from users (not for login, register and logout) 
 **/
export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true
})

apiClient.interceptors.response.use(
    (response) => response,  // Simply return the response if it's successful
    async (error) => {
        const originalRequest = error.config
        // If access token is expired (401) and the request hasn't been retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true  // Mark the request to avoid infinite retry loops

            try {
                // Refresh the access token using the refresh token
                await refreshAccessToken()
                console.log('access token refreshed')
                // Retry the original request since the token is now refreshed
                return apiClient(originalRequest)
            } catch (error) {
                console.error('Failed to refresh token, logging out...', error)
                window.location.href = '/home'
                return Promise.reject(error)
            }
        }
    
        return Promise.reject(error)  // Return any other errors without retrying
    }
)