import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/stores/auth/authSlice"
import { login, register, logout } from "@/services/AuthService"
import { useToastStore } from "@/stores/toastStore"

/**
 * Authentication hook
 */

export const useAuthentication = () => {
    const { setRole } = useAuthStore()
    const navigate = useNavigate()

    /**
     *  LOGIN mutation
     */

    const loginUser = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // console.log(data)
            const { userRole, message } = data
    
            setRole(userRole)
            console.log(message)
            useToastStore.getState().setToast(message, 'success')   // toast from global store to be able to display it on the next component after navigate

            userRole ? navigate('/') : navigate('/login')
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error?.message || 'Login failed', 'error')
            navigate('/login')
        }
    })

    /**
     * REGISTER mutation
     */

    const registerUser = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            // console.log(data)
            const { userRole, message } = data
            console.log(message)

            setRole(userRole)
            useToastStore.getState().setToast(message, 'success')

            userRole ? navigate('/') : navigate('/login')
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error?.message || 'Registration failed', 'error')
        }
    })

    /**
     * LOG OUT mutation
     */ 

    const logoutUser = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    function handleLogout() {
        logoutUser.mutate()
        window.location.href = '/home'
    }

    return  { loginUser, registerUser, handleLogout }
}