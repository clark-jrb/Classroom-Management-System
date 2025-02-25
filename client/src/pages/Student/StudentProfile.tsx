import { Container } from "@/components/Container"
import { StudentLayout } from "./StudentLayout"
import { ProfileContent } from "./Profile/ProfileContent"
import { Suspense } from "react"
import { useStudentData } from "@/hooks/useStudentQueries"

export const StudentProfile = () => {
    const { data } = useStudentData()
    return (
        <StudentLayout>
            <Container>
                <Suspense fallback={<div>loading profile data...</div>}>
                    <ProfileContent user_data={data}/>
                </Suspense>
            </Container>
        </StudentLayout>
    )
}
