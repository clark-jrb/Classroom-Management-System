import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { Evaluation } from "./Evaluation"
import { EvaluationViewGPA } from "./components/EvaluationViewGPA"
import { EvaluationViewGA } from "./components/EvaluationViewGA"
import { useTeacherData } from "@/hooks/useTeacherQueries"

export const EvaluationRoutes = () => {
    const { data: teacher_data } = useTeacherData()
    const { teacher_role, grade_assigned, section_handled } = teacher_data.classes
    
    if (teacher_role !== 'homeroom' || section_handled.length > 1) {
        return <div>You are not homeroom</div>
    }

    const section = section_handled.join('')

    return (
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Evaluation/>
                </Suspense>
            } />
            <Route path="/gpa" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <EvaluationViewGPA grade_assigned={grade_assigned} section={section}/>
                </Suspense>
            } />
            <Route path="/ga" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <EvaluationViewGA grade_assigned={grade_assigned} section={section}/>
                </Suspense>
            } />
        </Routes>
    )
}
