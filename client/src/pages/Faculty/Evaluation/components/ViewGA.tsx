import { Button } from "@/components/ui/button"
import { GATable } from "./GATable"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export const ViewGA = ({ grade_assigned, section }: {
    grade_assigned: string
    section: string 
}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <div className="flex items-center gap-2">
                <Button 
                    type={'button'} 
                    variant={'ghost'} 
                    onClick={() => navigate('/evaluation')}
                >
                    <ArrowLeft/>
                </Button>
                <div className="text-2xl text-navy">Students General Average</div>
                <div className="ms-auto text-xs text-gray-500">Note: <br />You can only submit the grades of each student after all the quarters are finished</div>
            </div>
            <GATable section={section} grade_assigned={grade_assigned} />
        </div>
    )
}
