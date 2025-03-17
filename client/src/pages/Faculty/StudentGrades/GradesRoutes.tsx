import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { Grades } from "./Grades"
import { GradesView } from "./components/GradesView"
import { LoaderCircle } from "lucide-react"

export const GradesRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <div className="space-y-4 flex flex-col h-full">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        Grades
                    </div>
                    <Routes>
                        <Route path="/" element={
                            <Suspense fallback={
                                <div className="flex-1 flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                                </div>
                            }>
                                <Grades/>
                            </Suspense>
                        }/>
                        <Route path="/view/:section/:subject" element={
                            <Suspense fallback={
                                <div className="flex-1 flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                                </div>
                            }>
                                <GradesView/>
                            </Suspense>
                        }/>
                        <Route path="*" element={<Navigate to="/grades" replace/>} />
                    </Routes>
                </div>
            </Container>
        </FacultyLayout>
    )
}