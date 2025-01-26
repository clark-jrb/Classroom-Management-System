import { useAuthentication } from '@/hooks/useAuthQueries'
import { SideNavbar } from '@/components/side-navbar'

export const FacultyLayout = ({ children }: any) => {
    const { handleLogout } = useAuthentication()

    const facultyLinks = [
        { name: 'Dashboard', url: '/' },
        { name: 'My Classes', url: '/classes' },
        { name: 'Records', url: '/records' },
        { name: 'Computations', url: '/computations' },
        { name: 'Grades', url: '/grades' },
        { name: 'My Profile', url: '/profile' },
    ]

    return (
        <>
            <SideNavbar role={'faculty'} handleLogout={handleLogout} links={facultyLinks}/>
            <main className="h-dvh student-content">
                { children }
            </main>
        </>
    )
}
