import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuthStore } from "@/stores/auth/authSlice"
import { Roles } from "@/types/global.types"

export const Home = () => {
    const { setRole } = useAuthStore()
    const navigate = useNavigate()
    const [roleState, setRoleState] = useState<string>()

    function handleSetRole(e: Roles) {
        setRoleState(e) 
        setRole(e)
    }

    return (
        <div className="home-page">
            <div className="border rounded-md p-6 flex gap-3">
                {!roleState ? 
                    <>
                        <Button onClick={() => handleSetRole('student')}>
                            Student
                        </Button>
                        <Button onClick={() => handleSetRole('faculty')}>
                            Faculty
                        </Button>
                        <Button onClick={() => handleSetRole('admin')}>
                            Admin
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
