import { FacultyLayout } from "./FacultyLayout"
import { Container } from "@/components/Container"
import { Suspense } from "react"
import { ProfileContent } from "../Student/Profile/ProfileContent"
import { useTeacherData } from "@/hooks/useTeacherQueries"

export const FacultyProfile = () => {
    const { data } = useTeacherData()
    return (
        <FacultyLayout>
            <Container>
                <Suspense fallback={<div>Loading profile...</div>}>
                    <ProfileContent user_data={data}/>
                </Suspense>
            </Container>
        </FacultyLayout>
    )
}
