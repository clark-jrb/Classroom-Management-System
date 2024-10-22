import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/authSlice";
import { isTokenExpired, tokenExpiration } from "@/helpers/jwt-decode";

const isAuthenticated = () => {
    const { accessToken, refreshToken, role } = useAuthStore()
    const isAccessTokenExpired = isTokenExpired(accessToken)

    useEffect(() => {
        console.log('access token: ' + accessToken)
        // console.log('refresh token: ' + refreshToken)
        // console.log('role token: ' + role)
        console.log('is access token expired?: ' + isAccessTokenExpired)
        console.log('token expiration: ' + tokenExpiration(accessToken))
    }, [accessToken]);
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