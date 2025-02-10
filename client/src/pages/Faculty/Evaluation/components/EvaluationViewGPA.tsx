import { Button } from "@/components/ui/button"
import { useTeacherData } from "@/hooks/useTeacherQueries"
import { useNavigate } from "react-router-dom"

export const EvaluationViewGPA = () => {
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
            EvaluationViewGPA
            {section}{grade_assigned}
        </div>
    )
}
