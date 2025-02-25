import { FacultyLayout } from "./FacultyLayout"
import { Container } from "@/components/Container"
import { Suspense } from "react"

export const FacultyProfile = () => {
    return (
        <FacultyLayout>
            <Container>
                <Suspense fallback={<div>Loading profile...</div>}>
                    My Profile
                </Suspense>
            </Container>
        </FacultyLayout>
    )
}
