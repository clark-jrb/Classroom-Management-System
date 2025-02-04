import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/container"
import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { Evaluation } from "./Evaluation"

export const EvaluationRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Evaluation/>
                        </Suspense>
                    } />
                </Routes>
            </Container>
        </FacultyLayout>
    )
}
