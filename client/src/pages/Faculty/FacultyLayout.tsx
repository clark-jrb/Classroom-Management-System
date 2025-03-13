import { useAuthQuery } from '@/hooks/useAuthQuery'
import { SideNavbar } from '@/components/Side-Navbar'
import { useTeacherStore } from "@/stores/auth/authSlice"
import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useToastStore } from '@/stores/toastStore'
import { Archive, BookOpenCheck, LayoutDashboard, NotebookPen, NotebookText, School, UserRoundPen } from 'lucide-react'

export const FacultyLayout = ({ children }: any) => {
    const { handleLogout } = useAuthQuery()
    const { teacher_role } = useTeacherStore()

    const { message, type, clearToast } = useToastStore()

    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    const facultyLinks = [
        { name: (
            <span className="flex gap-2 text-navy">
                <LayoutDashboard strokeWidth={1} />Dashboard
            </span>
        ), url: '/' },
        { name: (
            <span className="flex gap-2 text-navy">
                <School strokeWidth={1} />Class
            </span>
        ), url: '/classes' },
        { name: (
            <span className="flex gap-2 text-navy">
                <Archive strokeWidth={1} />Records
            </span>
        ), url: '/records' },
        { name: (
            <span className="flex gap-2 text-navy">
                <NotebookPen strokeWidth={1} />Computations
                
            </span>
        ), url: '/computations' },
        { name: (
            <span className="flex gap-2 text-navy">
                <NotebookText strokeWidth={1} />Grades
            </span>
        ), url: '/grades' },
        { name: (
            <span className="flex gap-2 text-navy">
                <BookOpenCheck strokeWidth={1} />Evaluation
            </span>
        ), url: '/evaluation' },
        { name: (
            <span className="flex gap-2 text-navy">
                <UserRoundPen strokeWidth={1} />Profile
            </span>
        ), url: '/profile' },
    ]

    function removeEvaluation() {
        return facultyLinks.filter(links => links.url !== '/evaluation')
    }

    return (
        <>
            <SideNavbar 
                role={'faculty'} 
                handleLogout={handleLogout} 
                links={
                    teacher_role && teacher_role !== 'homeroom'
                        ? removeEvaluation()
                        : facultyLinks
                }
            />
            <main className="h-dvh main-content">
                { children }
                <Toaster richColors/>
            </main>
        </>
    )
}
