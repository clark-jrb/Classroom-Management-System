import { Container } from "@/components/Container"
import { StudentLayout } from "./StudentLayout"
import { ProfileContent } from "./Profile/ProfileContent"
import { Suspense } from "react"

export const StudentProfile = () => {
    return (
        <StudentLayout>
            <Container>
                <Suspense fallback={<div>loading profile data...</div>}>
                    <ProfileContent/>
                </Suspense>
            </Container>
        </StudentLayout>
    )
}
