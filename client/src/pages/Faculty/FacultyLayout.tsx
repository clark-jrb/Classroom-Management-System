import { useAuthentication } from '@/hooks/useAuthQueries'
import { SideNavbar } from '@/components/Side-Navbar'
import { useTeacherStore } from '@/stores/auth/authSlice'
import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useToastStore } from '@/stores/toastStore'

export const FacultyLayout = ({ children }: any) => {
    const { handleLogout } = useAuthentication()
    const { teacher_role } = useTeacherStore()

    const { message, type, clearToast } = useToastStore()

    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    const facultyLinks = [
        { name: 'Dashboard', url: '/' },
        { name: 'My Classes', url: '/classes' },
        { name: 'Records', url: '/records' },
        { name: 'Computations', url: '/computations' },
        { name: 'Grades', url: '/grades' },
        { name: 'Evaluation', url: '/evaluation' },
        { name: 'My Profile', url: '/profile' },
    ]

    function removeEvaluation() {
        return facultyLinks.filter(links => links.name !== 'Evaluation')
    }

    return (
        <>
            <SideNavbar 
                role={'faculty'} 
                handleLogout={handleLogout} 
                links={
                    teacher_role !== 'homeroom'
                    ? removeEvaluation()
                    : facultyLinks
                }
            />
            <main className="h-dvh student-content">
                { children }
                <Toaster/>
            </main>
        </>
    )
}
