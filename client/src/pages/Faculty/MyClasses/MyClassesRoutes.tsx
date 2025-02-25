import { Container } from "@/components/Container"
import { FacultyLayout } from "../FacultyLayout"
import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { MyClasses } from "./MyClasses"


export const MyClassesRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <Routes>
                    <Route path="/" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <MyClasses/>
                        </Suspense>
                    }/>
                </Routes>
            </Container>
        </FacultyLayout>
    )
}
