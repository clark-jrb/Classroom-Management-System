import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/authSlice";

const isAuthenticated = () => {
    const { accessToken, refreshToken, role } = useAuthStore()

    useEffect(() => {
        console.log('access token: ' + accessToken)
        console.log('refresh token: ' + refreshToken)
        console.log('role token: ' + role)
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