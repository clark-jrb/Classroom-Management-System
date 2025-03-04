import { SideNavbar } from "@/components/Side-Navbar"
import { useAuthQuery } from "@/hooks/useAuthQuery"
import { useToastStore } from "@/stores/toastStore"
import { useEffect } from "react"
import { toast, Toaster } from "sonner"

export const AdminLayout = ({ children }: any) => {
    const { handleLogout } = useAuthQuery()
    const { message, type, clearToast } = useToastStore()

    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    const adminLinks = [
        { name: 'Dashboard', url: '/' },
    ]

    return (
        <>
            <SideNavbar role="admin" handleLogout={handleLogout} links={adminLinks}/>
            <main className="h-dvh main-content">
                { children }
                <Toaster richColors/>
            </main>
        </>
    )
}
