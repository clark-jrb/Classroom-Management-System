import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { useQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useState, useEffect } from "react"

export const Profile = () => {
    const { user_id } = useAuthStore()

    const { data, error, isLoading, isError } = useQuery({
        queryFn: () => getStudentInformation(user_id),
        queryKey: ['student_data', user_id],
        enabled: !!user_id
    })

    if (isLoading) {
        console.log('loading student...')
    }
    
    if (isError) {
        console.log(error)
    }

    const student_data = Array.isArray(data) ? data : Object.values(data || {});

    return (
        <StudentLayout>
            <StudentContainer>
                Profile
                <div>
                    {student_data.map((item: any, index: number) => (
                        <div key={index}>
                            { item.firstname }{ item.middlename }{ item.lastname }
                        </div>
                    ))}
                </div>
            </StudentContainer>
        </StudentLayout>
    )
}
