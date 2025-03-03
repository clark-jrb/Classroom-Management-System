import { Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { Evaluation } from "./Evaluation"
import { ViewQA } from "./components/ViewQA"
import { ViewGA } from "./components/ViewGA"
import { useTeacherData } from "@/hooks/useTeacherQuery"

export const EvaluationRoutes = () => {
    const { data: teacher_data } = useTeacherData()
    const { teacher_role, grade_assigned, section_handled } = teacher_data.classes
    
    if (teacher_role !== 'homeroom') {
        return <Navigate to="/" replace/>
    }

    const section = section_handled.join('')

    return (
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Evaluation/>
                </Suspense>
            } />
            <Route path="/qa" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <ViewQA grade_assigned={grade_assigned} section={section}/>
                </Suspense>
            } />
            <Route path="/ga" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <ViewGA grade_assigned={grade_assigned} section={section}/>
                </Suspense>
            } />
        </Routes>
    )
}
