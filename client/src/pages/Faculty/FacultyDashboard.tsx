import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"


export const FacultyDashboard = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    function handleLogout() {
        mutation.mutate()
        navigate('/login')
    }

    return (
        <div>
            Faculty Dashboard
            <Button size={'sm'} onClick={handleLogout}>Log Out</Button>
        </div>
    )
}
