import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/stores/auth/authSlice"
import { login, register, logout } from "@/services/AuthService"
import { useToastStore } from "@/stores/toastStore"

/**
 * Custom hook for authentication functions
 */
export const useAuthQuery = () => {
    const { setRole } = useAuthStore()
    const navigate = useNavigate()

    /**
     *  LOGIN mutation
     */
    const loginUser = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // console.log(data)
            const { userRole, success, message } = data
    
            setRole(userRole)
            console.log(message)
            useToastStore.getState().setToast(message, success ? 'success' : 'warning')   // toast from global store to be able to display it on the next component after navigate

            if (success) {
                navigate('/')
            }
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error.message, 'error')
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
            const { userRole, success, message } = data
            console.log(message)

            setRole(userRole)
            useToastStore.getState().setToast(message, success ? 'success' : 'warning')

            if (success) {
                navigate('/')
            }
        },
        onError: (error) => {
            console.log(error)
            useToastStore.getState().setToast(error.message, 'error')
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