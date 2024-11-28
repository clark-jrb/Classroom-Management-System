import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/stores/auth/authSlice"
import { login, register, logout } from "@/services/AuthService"

export const useAuthentication = () => {
    const { setRole } = useAuthStore()
    const navigate = useNavigate()

    // LOGIN 
    const loginUser = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // console.log(data)
            const { userRole, message } = data
    
            setRole(userRole)
            console.log(message)
    
            switch (userRole) {
                case 'student':
                    navigate('/')
                    break
                case 'faculty':
                    navigate('/faculty')
                    break
                default:
                    navigate('/login')
                    break
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    // REGISTER 
    const registerUser = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            // console.log(data)
            const { userRole, message } = data
            console.log(message)

            setRole(userRole)

            switch (userRole) {
                case 'student':
                    navigate('/')
                    break
                case 'faculty':
                    navigate('/faculty')
                    break
                default:
                    navigate('/login')
                    break
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    // LOGOUT 
    const logoutUser = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    // LOGOUT FUNCTION
    function handleLogout() {
        logoutUser.mutate()
        window.location.href = '/home'
    }

    return  { loginUser, registerUser, handleLogout }
}

