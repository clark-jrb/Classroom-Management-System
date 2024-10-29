// import { useAuthStore } from "@/stores/auth/authSlice"
// import { useEffect } from "react"
import { StudentLayout } from "./StudentLayout"
import { StudentContainer } from "@/components/student-container"

export const Grades = () => {
    // const { role } = useAuthStore()

    // useEffect(() => {
    //     if (role) {
    //         console.log(role)
    //     }
    // }, [role]);

    return (
        <StudentLayout>
            <StudentContainer>
                <div>Grades</div>
            </StudentContainer>
        </StudentLayout>
    )
}
