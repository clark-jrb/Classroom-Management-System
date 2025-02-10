import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const Evaluation = () => {
    const navigate = useNavigate()

    return (
        <div className="space-y-4">
            <div>Student Grades Evaluation</div>
            <Button 
                variant={'outline'} 
                size={'lg'} 
                className="block" 
                onClick={() => navigate('/evaluation/gpa')}
            >
                Students General Point Average
            </Button>
            <Button 
                variant={'outline'} 
                size={'lg'} 
                className="block" 
                onClick={() => navigate('/evaluation/ga')}
            >
                Students General Average
            </Button>
        </div>
    )
}
