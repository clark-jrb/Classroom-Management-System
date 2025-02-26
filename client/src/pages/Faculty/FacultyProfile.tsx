import { FacultyLayout } from "./FacultyLayout"
import { Container } from "@/components/Container"
import { Suspense } from "react"
import { ProfileContent } from "../Student/Profile/ProfileContent"
import { useTeacherData } from "@/hooks/useTeacherQueries"

export const FacultyProfile = () => {
    return (
        <FacultyLayout>
            <Container>
                <Suspense fallback={<div>Loading profile...</div>}>
                    <ProfileMain/>
                </Suspense>
            </Container>
        </FacultyLayout>
    )
}


const ProfileMain = () => {
    const { data } = useTeacherData()
    return <ProfileContent user_data={data}/>
}

