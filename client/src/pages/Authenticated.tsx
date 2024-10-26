import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"

const isAuthenticated = () => {
    const { setRole } = useAuthStore()
    
    const { data } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    })
    
    useEffect(() => {
        const currentUser = data?.data.currentUser

        if (data) {
            setRole(currentUser.role)
            console.log(currentUser)
        }
    }, [data, setRole]);
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