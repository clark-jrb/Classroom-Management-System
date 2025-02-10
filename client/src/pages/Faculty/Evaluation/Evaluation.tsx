import { Button } from "@/components/ui/button"
import { useTeacherData } from "@/hooks/useTeacherQueries"
import { useNavigate } from "react-router-dom"

export const Evaluation = () => {
    const navigate = useNavigate()
    const { data: teacher_data } = useTeacherData()
    const { teacher_role, section_handled } = teacher_data.classes
    
    if (teacher_role !== 'homeroom' || section_handled.length > 1) {
        return <div>You are not homeroom</div>
    }

    return (
        <div className="space-y-4">
            <div>Student Grades Evaluation</div>
            <Button variant={'outline'} size={'lg'} className="block" onClick={() => navigate('/evaluation/gpa')}>
                Students General Point Average
            </Button>
            <Button variant={'outline'} size={'lg'} className="block" onClick={() => navigate('/evaluation/ga')}>
                Students General Average
            </Button>
        </div>
    )
}
