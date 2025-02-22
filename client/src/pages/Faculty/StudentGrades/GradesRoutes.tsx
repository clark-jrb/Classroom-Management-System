import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
// import { SectionView } from "../Computations/components/SectionView"
import { Grades } from "./Grades"
import { GradesView } from "./components/GradesView"

export const GradesRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Grades/>
                        </Suspense>
                    }/>
                    <Route path="/view/:section/:subject" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <GradesView/>
                        </Suspense>
                    }/>
                    <Route path="/view" element={<Navigate to={'/'} replace />}/>
                </Routes>
            </Container>
        </FacultyLayout>
    )
}