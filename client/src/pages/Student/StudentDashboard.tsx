import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"

export const StudentDashboard = () => {
    const navigate = useNavigate()

    function handleNavigate() {
        navigate('/grades')
    }

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
            Student Dashboard
            <Button size={'sm'} onClick={handleNavigate}>Go to grades</Button>
            <Button size={'sm'} onClick={handleLogout}>Log Out</Button>
        </div>
    )
}
