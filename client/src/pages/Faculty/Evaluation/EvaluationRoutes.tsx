import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/container"
import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { Evaluation } from "./Evaluation"
import { EvaluationViewGPA } from "./components/EvaluationViewGPA"
import { EvaluationViewGA } from "./components/EvaluationViewGA"

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
                    <Route path="/gpa" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <EvaluationViewGPA/>
                        </Suspense>
                    } />
                    <Route path="/ga" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <EvaluationViewGA/>
                        </Suspense>
                    } />
                </Routes>
            </Container>
        </FacultyLayout>
    )
}
