import { SideNavbar } from "@/components/Side-Navbar"
import { useAuthQuery } from "@/hooks/useAuthQuery"
import { useToastStore } from "@/stores/toastStore"
import { LayoutDashboard, Users } from "lucide-react"
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
        { name: (
            <span className="flex gap-2 text-navy">
                <LayoutDashboard strokeWidth={1} />Dashboard
            </span>
        ), url: '/' },
        { name: (
            <span className="flex gap-2 text-navy">
                <Users strokeWidth={1} />Students
            </span>
        ), url: '/students' },
        { name: (
            <span className="flex gap-2 text-navy">
                <Users strokeWidth={1} />Teachers
            </span>
        ), url: '/teachers' },
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
