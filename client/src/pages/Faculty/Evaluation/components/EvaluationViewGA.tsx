import { Button } from "@/components/ui/button"
import { EvaluationTable } from "./EvaluationTable"
import { useNavigate } from "react-router-dom"
import { useTeacherData } from "@/hooks/useTeacherQueries"

export const EvaluationViewGA = () => {
    const navigate = useNavigate()
    const { data: teacher_data } = useTeacherData()
    const { teacher_role, grade_assigned, section_handled } = teacher_data.classes
    
    if (teacher_role !== 'homeroom' || section_handled.length > 1) {
        return <div>You are not homeroom</div>
    }

    const section = section_handled.join('')
    
    return (
        <div>
            <Button variant={'outline'} onClick={() => navigate('/evaluation')}>Go back</Button>
            <EvaluationTable section={section} grade_assigned={grade_assigned} />
        </div>
    )
}
