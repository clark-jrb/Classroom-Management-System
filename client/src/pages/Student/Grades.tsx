import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"

export const Grades = () => {
    const { role } = useAuthStore()

    useEffect(() => {
        if (role) {
            console.log(role)
        }
    }, [role]);

    return (
        <div>Grades</div>
    )
}
