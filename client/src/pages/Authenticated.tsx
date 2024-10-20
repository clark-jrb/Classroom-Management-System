import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/authSlice";

const isAuthenticated = () => {
    const { accessTokenC } = useAuthStore()

    useEffect(() => {
        console.log('access token: ' + accessTokenC)
    }, [accessTokenC]);
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