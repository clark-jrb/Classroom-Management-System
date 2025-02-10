import { Button } from "@/components/ui/button"
import { EvaluationTable } from "./EvaluationTable"
import { useNavigate } from "react-router-dom"

export const EvaluationViewGA = ({ section, grade_assigned }: {
    section: string
    grade_assigned: string
}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <Button variant={'outline'} onClick={() => navigate('/evaluation')}>Go back</Button>
            <EvaluationTable section={section} grade_assigned={grade_assigned} />
        </div>
    )
}
