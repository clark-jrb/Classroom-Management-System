import { useAuthQuery } from '@/hooks/useAuthQuery'
import { SideNavbar } from '@/components/Side-Navbar'
import { Toaster } from '@/components/ui/sonner'
import { useToastStore } from '@/stores/toastStore'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { LayoutDashboard, TableProperties, UserRoundPen } from 'lucide-react'

export const StudentLayout = ({ children }: any) => {
    const { handleLogout } = useAuthQuery()
    const { message, type, clearToast } = useToastStore()

    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    const studentLinks = [
        { name: (
            <span className="flex gap-2 text-navy">
                <LayoutDashboard strokeWidth={1} />Dashboard
            </span>
        ), url: '/' },
        { name: (
            <span className="flex gap-2 text-navy">
                <TableProperties strokeWidth={1} />Grades
            </span>
        ), url: '/grades' },
        { name: (
            <span className="flex gap-2 text-navy">
                <UserRoundPen strokeWidth={1} />Profile
            </span>
        ), url: '/profile' },
    ]

    return (
        <>
            <SideNavbar role={'student'} handleLogout={handleLogout} links={studentLinks}/>
            <main className="h-dvh main-content">
                { children }
                <Toaster richColors/>
            </main>
        </>
    )
}
