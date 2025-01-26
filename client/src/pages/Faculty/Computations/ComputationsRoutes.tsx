import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/container"
import { Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { ComputationView } from "./components/ComputationView"
import { Computations } from "./Computations"

export const ComputationsRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Computations/>
                        </Suspense>
                    }/>
                    <Route path="/view/:section/:subject" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <ComputationView/>
                        </Suspense>
                    }/>
                    <Route path="/view" element={<Navigate to={'/'} replace />}/>
                </Routes>
            </Container>
        </FacultyLayout>
    )
}
