import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/container"
import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { SectionView } from "./components/SectionView"
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
                            <SectionView/>
                        </Suspense>
                    }/>
                </Routes>
            </Container>
        </FacultyLayout>
    )
}
