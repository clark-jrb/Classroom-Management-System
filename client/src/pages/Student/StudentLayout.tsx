import { useAuthQuery } from '@/hooks/useAuthQuery'
import { SideNavbar } from '@/components/Side-Navbar'
import { Toaster } from '@/components/ui/sonner'
import { useToastStore } from '@/stores/toastStore'
import { toast } from 'sonner'
import { useEffect } from 'react'

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
        { name: 'Dashboard', url: '/' },
        { name: 'My Grades', url: '/grades' },
        { name: 'My Profile', url: '/profile' },
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
