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
            // console.log(currentUser)
        }
    }, [data, setRole]);
}

export const Student = () => {
    isAuthenticated()
    return (
        <>
            {/* this is student */}
            <Outlet/>
        </>
    )
}

export const Faculty = () => {
    isAuthenticated()
    return (
        <>
            {/* this is faculty */}
            <Outlet/>
        </>
    )
}