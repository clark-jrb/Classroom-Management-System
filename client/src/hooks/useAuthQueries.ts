import { useNavigate } from "react-router-dom"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/stores/auth/authSlice"
import { login, register, logout } from "@/services/AuthService"
import { getCurrentUser } from "@/services/UserService"
import { useToastStore } from "@/stores/toastStore"

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
            useToastStore.getState().setToast(message, 'success')

            userRole ? navigate('/') : navigate('/login')
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error?.message || 'Login failed', 'error')
            navigate('/login')
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

            userRole ? navigate('/') : navigate('/login')
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

export const useCurrentUser = () => {
    return useSuspenseQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser, // get current user on the server
    })
}