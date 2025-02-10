import { Button } from "@/components/ui/button"
import { GATable } from "./GATable"
import { useNavigate } from "react-router-dom"

export const ViewGA = ({ grade_assigned, section }: {
    grade_assigned: string
    section: string 
}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <Button variant={'outline'} onClick={() => navigate('/evaluation')}>Go back</Button>
            <GATable section={section} grade_assigned={grade_assigned} />
        </div>
    )
}
