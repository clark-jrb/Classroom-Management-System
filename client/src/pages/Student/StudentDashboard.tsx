import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const StudentDashboard = () => {
    const navigate = useNavigate()

    function handleNavigate() {
        navigate('/grades')
    }

    return (
        <div>
            Student Dashboard
            <Button size={'sm'} onClick={handleNavigate}>Go to grades</Button>
        </div>
    )
}
