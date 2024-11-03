import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuthStore } from "@/stores/auth/authSlice"

export const Home = () => {
    const { setRole } = useAuthStore()
    const navigate = useNavigate()
    const [roleState, setRoleState] = useState('');

    function handleSetRole(e: string) {
        setRoleState(e) 
        setRole(e)
    }

    return (
        <div className="home-page">
            <div className="border rounded-md p-6 flex gap-3">
                {roleState === '' ? 
                    <>
                        <Button onClick={() => handleSetRole('student')}>
                            Student
                        </Button>
                        <Button onClick={() => handleSetRole('faculty')}>
                            Faculty
                        </Button>
                    </>
                    :
                    <>
                        <Button onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button onClick={() => navigate('/register')}>
                            Register
                        </Button>
                        <Button onClick={() => setRoleState('')} variant={"outline"}>
                            Go back
                        </Button>
                    </>
                }
                
            </div>
        </div>
    )
}
