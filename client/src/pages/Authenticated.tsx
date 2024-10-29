import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"

const isAuthenticated = () => {
    const { setRole, setUserId } = useAuthStore()
    
    const { data } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    })
    
    useEffect(() => {
        if (data && data.currentUser) {
            setRole(data.currentUser.role);
            setUserId(data.currentUser._id);
        }
    }, [data, setRole, setUserId]);
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