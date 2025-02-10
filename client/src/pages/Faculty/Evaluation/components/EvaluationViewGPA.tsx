import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const EvaluationViewGPA = ({ grade_assigned, section }: {
    grade_assigned: string
    section: string 
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
