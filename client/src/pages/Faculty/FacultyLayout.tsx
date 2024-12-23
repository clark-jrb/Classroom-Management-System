import { useAuthentication } from '@/hooks/AuthenticationQueries'
import { SideNavbar } from '@/components/side-navbar'

export const FacultyLayout = ({ children }: any) => {
    const { handleLogout } = useAuthentication()

    const facultyLinks = [
        { name: 'Dashboard', url: '/' },
        { name: 'My Classes', url: '/classes' },
        { name: 'Records', url: '/records' },
        { name: 'Computations', url: '/computations' },
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
