// import { useAuthStore } from "@/stores/auth/authSlice"
// import { useEffect } from "react"
import { StudentLayout } from "./StudentLayout"
import { Container } from "@/components/container"
import { useStudentGPAs } from "@/hooks/useStudentQueries"
import { useAuthStore } from "@/stores/auth/authSlice"
import { QuarterTypes } from "@/types/types"

export const MyGrades = () => {
    const { user_id } = useAuthStore()
    const { data } = useStudentGPAs(user_id)

    function filterByQuarter(quarter: QuarterTypes) {
        return data.filter(item => item.quarter === quarter)
    }

    console.log(filterByQuarter('q1'))

    return (
        <StudentLayout>
            <Container>
                <div>Grades</div>
            </Container>
        </StudentLayout>
    )
}
