import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/authSlice";
import { isTokenExpired, tokenExpiration } from "@/helpers/jwt-decode";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const isAuthenticated = () => {
    // const { accessToken, refreshToken, role } = useAuthStore()
    // const isAccessTokenExpired = isTokenExpired(accessToken)

    const getAuthenticatedUser = async (): Promise<any> => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/authenticated`, {
            withCredentials: true
        })
        return response
    }

    const { data, isError, error } = useQuery({
        queryFn: () => getAuthenticatedUser(),
        queryKey: ['currentUser']
    })

    
    useEffect(() => {
        console.log(data)
        // console.log('access token: ' + accessToken)
        // console.log('is access token expired?: ' + isAccessTokenExpired)
        // console.log('token expiration: ' + tokenExpiration(accessToken))
    }, [data]);
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