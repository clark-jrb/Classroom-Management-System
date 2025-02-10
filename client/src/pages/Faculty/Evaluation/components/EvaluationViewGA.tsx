import { Button } from "@/components/ui/button"
import { EvaluationTable } from "./EvaluationTable"
import { useNavigate } from "react-router-dom"

export const EvaluationViewGA = ({ grade_assigned, section }: {
    grade_assigned: string
    section: string 
}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <Button variant={'outline'} onClick={() => navigate('/evaluation')}>Go back</Button>
            <EvaluationTable section={section} grade_assigned={grade_assigned} />
        </div>
    )
}
