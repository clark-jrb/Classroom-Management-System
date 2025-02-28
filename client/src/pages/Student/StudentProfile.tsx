import { Container } from "@/components/Container"
import { StudentLayout } from "./StudentLayout"
import { ProfileContent } from "./Profile/ProfileContent"
import { Suspense } from "react"
import { useStudentData } from "@/hooks/useStudentQuery"

export const StudentProfile = () => {
    return (
        <StudentLayout>
            <Container>
                <Suspense fallback={<div>loading profile data...</div>}>
                    <ProfileMain/>
                </Suspense>
            </Container>
        </StudentLayout>
    )
}

const ProfileMain = () => {
    const { data } = useStudentData()
    return <ProfileContent user_data={data}/>
}