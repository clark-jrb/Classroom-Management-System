import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/authSlice";
import { isTokenExpired, tokenExpiration } from "@/helpers/jwt-decode";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const isAuthenticated = () => {
    // const { accessToken, refreshToken, role } = useAuthStore()
    // const isAccessTokenExpired = isTokenExpired(accessToken)

    const api = axios.create({
        baseURL: `${import.meta.env.VITE_SERVER_URL}`,
        withCredentials: true
    })
    
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/refresh`, {}, {
                withCredentials: true,  // Include the httpOnly refresh token cookie in the request
            });
            return response.data;  // You don't need to return an access token directly, as it's set in httpOnly cookies
        } catch (error) {
            console.error('Error refreshing access token', error);
            throw error;
        }
    };
    
    api.interceptors.response.use(
        (response) => response,  // Simply return the response if it's successful
        async (error) => {
            const originalRequest = error.config;
        
            // If access token is expired (401) and the request hasn't been retried yet
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;  // Mark the request to avoid infinite retry loops
        
                try {
                    // Refresh the access token using the refresh token
                    await refreshAccessToken();
                    console.log('access token refreshed')
                    // Retry the original request since the token is now refreshed
                    return api(originalRequest);
                } catch (err) {
                    console.error('Failed to refresh token, logging out...', err);
                    // Optional: redirect to login page or handle token refresh failure
                    window.location.href = '/login';  // Example logout action
                    return Promise.reject(err);
                }
            }
        
            return Promise.reject(error);  // Return any other errors without retrying
        }
    );

    const { data, isError, error, isLoading, status } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/authenticated`, {
                withCredentials: true
            })
            return response
        }
    })

    if (isLoading) {
        console.log("Loading...");
    } else if (isError) {
        console.error("Error fetching user:", error);
        console.log(status)
        // getNewAccessToken()
    } else {
        console.log(data); // Log data only when it is defined
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