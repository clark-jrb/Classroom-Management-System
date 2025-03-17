import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { ComputationView } from "./components/ComputationView"
import { Computations } from "./Computations"
import { LoaderCircle } from "lucide-react"

export const ComputationsRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <div className="space-y-4 flex flex-col h-full">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        Computations
                    </div>
                    <Routes>
                        <Route path="/" element={
                            <Suspense fallback={
                                <div className="flex-1 flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                                </div>
                            }>
                                <Computations/>
                            </Suspense>
                        }/>
                        <Route path="/view/:section/:subject" element={
                            <Suspense fallback={
                                <div className="flex-1 flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                                </div>
                            }>
                                <ComputationView/>
                            </Suspense>
                        }/>
                        <Route path="*" element={<Navigate to="/computations" replace/>} />
                    </Routes>
                </div>
            </Container>
        </FacultyLayout>
    )
}
