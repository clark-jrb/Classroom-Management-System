import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth/authSlice"
import { Roles } from "@/types/global.types"
import { ArrowLeft } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { useToastStore } from "@/stores/toastStore"
import { toast } from "sonner"

export const Home = () => {
    const { setRole } = useAuthStore()
    const navigate = useNavigate()
    const [roleState, setRoleState] = useState<string>()
    const { message, type, clearToast } = useToastStore()

    function handleSetRole(e: Roles) {
        setRoleState(e) 
        setRole(e)
    }

    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    return (
        <div className="home-page">
            <div className="w-[20rem] h-[20rem] flex flex-col justify-center gap-4 border rounded-md p-6 bg-white shadow-sm">
                {!roleState ? 
                    <>
                        <div className="flex justify-center">
                            <Button 
                                className="w-full py-6 button-role text-md" 
                                onClick={() => handleSetRole('student')}
                            >
                                Student
                            </Button>
                        </div>
                        <div className="flex justify-center">or</div>
                        <div className="flex justify-center">
                            <Button 
                                className="w-full py-6 button-role text-md" 
                                onClick={() => handleSetRole('faculty')}
                            >
                                Faculty
                            </Button>
                        </div>
                        <div className="border-b"></div>
                        <div className="flex justify-center">
                            <Button 
                                className="w-full py-6 button-role-admin text-md" 
                                onClick={() => handleSetRole('admin')}
                            >
                                Admin
                            </Button>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex justify-center">
                            <Button 
                                className="w-full py-6 button-role text-md" 
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        </div>
                        {roleState !== 'admin' && 
                            <>
                            <div className="flex justify-center">or</div>
                            <div className="flex justify-center">
                                <Button 
                                    className="w-full py-6 button-role text-md" 
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </Button>
                            </div>
                            </>
                        }
                        <div className="border-b"></div>
                        <div>
                            <Button 
                                className="text-md" 
                                variant={'outline'}
                                onClick={() => setRoleState('')}
                            >
                                <ArrowLeft/>Go back
                            </Button>
                        </div>
                    </>
                }
                
            </div>
            <Toaster richColors/>
        </div>
    )
}
