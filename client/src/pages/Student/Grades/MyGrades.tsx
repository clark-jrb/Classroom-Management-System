import { StudentLayout } from "../StudentLayout"
import { Container } from "@/components/Container"
import { Suspense } from "react"
import { GradesTable } from "./GradesTable"

export const MyGrades = () => {


    return (
        <StudentLayout>
            <Container>
                <Suspense fallback={<div>Loading...</div>}>
                    <GradesTable/>
                </Suspense>
            </Container>
        </StudentLayout>
    )
}
