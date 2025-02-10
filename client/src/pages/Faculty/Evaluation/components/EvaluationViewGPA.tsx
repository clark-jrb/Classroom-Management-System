import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const EvaluationViewGPA = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const navigate = useNavigate()

    return (
        <div>
            <Button variant={'outline'} onClick={() => navigate('/evaluation')}>Go back</Button>
            EvaluationViewGPA
            {section}{grade_assigned}
        </div>
    )
}
