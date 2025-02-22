import { Container } from "@/components/Container"
import { FacultyLayout } from "../FacultyLayout"
import { EvaluationRoutes } from "./EvaluationRoutes"
import { Suspense } from "react"

export const EvaluationPage = () => {
    return (
        <FacultyLayout>
            <Container>
                <Suspense fallback={<div>Loading...</div>}>
                    <EvaluationRoutes/>
                </Suspense>
            </Container>
        </FacultyLayout>
    )
}
