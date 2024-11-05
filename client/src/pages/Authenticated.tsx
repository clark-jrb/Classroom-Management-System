import { Outlet } from "react-router-dom"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect, Suspense } from "react"

const CurrentUser = () => {
    const { setRole, setUserId } = useAuthStore()
    
    const { data } = useSuspenseQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    })
    
    useEffect(() => {
        if (data && data.currentUser) {
            setRole(data.currentUser.role);
            setUserId(data.currentUser._id);
        }
    }, [data, setRole, setUserId]);

    return (
        <>
            <Outlet/>
        </>
    )
}

export const Student = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CurrentUser/>
        </Suspense>
    )
}

export const Faculty = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CurrentUser/>
        </Suspense>
    )
}