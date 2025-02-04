import { useAuthentication } from '@/hooks/useAuthQueries'
import { SideNavbar } from '@/components/side-navbar'
import { teacherInfo } from '@/hooks/useTeacherQueries'

export const FacultyLayout = ({ children }: any) => {
    const { handleLogout } = useAuthentication()
    const { teacher_role } = teacherInfo()

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
            <SideNavbar role={'faculty'} handleLogout={handleLogout} links={
                teacher_role !== 'homeroom'
                ? removeEvaluation()
                : facultyLinks
            }/>
            <main className="h-dvh student-content">
                { children }
            </main>
        </>
    )
}
