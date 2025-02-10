import { useTeacherData } from "@/hooks/useTeacherQueries"
import { EvaluationTable } from "./components/EvaluationTable"


export const Evaluation = () => {
    const { data: teacher_data } = useTeacherData()
    const { teacher_role, grade_assigned, section_handled } = teacher_data.classes
    
    if (teacher_role !== 'homeroom' || section_handled.length > 1) {
        return (
            <div>
                You are not homeroom teacher
            </div>
        )
    }

    const section = section_handled.join('')

    return (
        <div>
            Evaluation
            <EvaluationTable section={section} grade_assigned={grade_assigned} />
        </div>
    )
}
