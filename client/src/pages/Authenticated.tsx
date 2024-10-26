import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { refreshAccessToken } from "@/services/AuthService"
import { apiClient } from "@/services/api"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"

const isAuthenticated = () => {
    const { setRole } = useAuthStore()
    // const isAccessTokenExpired = isTokenExpired(accessToken)
    
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
                    window.location.href = '/login'
                    return Promise.reject(error)
                }
            }
        
            return Promise.reject(error)  // Return any other errors without retrying
        }
    )

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    })

    const currentUser = data?.data.currentUser

    if (isLoading) {
        console.log("Loading...")
    } else if (isError) {
        console.error("Error fetching user:", error)
    } else {
        console.log(currentUser)
        // setRole(da)
    }
}

export const Student = () => {
    isAuthenticated()
    return (
        <main>
            this is student
            <Outlet/>
        </main>
    )
}

export const Faculty = () => {
    isAuthenticated()
    return (
        <main>
            this is faculty
            <Outlet/>
        </main>
    )
}