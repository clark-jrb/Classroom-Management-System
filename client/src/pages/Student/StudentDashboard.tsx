import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"
import { StudentLayout } from "./StudentLayout"

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
        <StudentLayout>
            <div className="student-dash rounded-md h-full shadow">
                Student Dashboard
                <Button size={'sm'} onClick={handleNavigate}>Go to grades</Button>
                <Button size={'sm'} onClick={handleLogout}>Log Out</Button>
            </div>
        </StudentLayout>
    )
}
