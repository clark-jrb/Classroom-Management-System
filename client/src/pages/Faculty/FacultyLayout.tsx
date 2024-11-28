import { useAuthentication } from '@/hooks/useAuthentication'
import { SideNavbar } from '@/components/side-navbar'

export const FacultyLayout = ({ children }: any) => {
    const { handleLogout } = useAuthentication()

    const facultyLinks = [
        { name: 'Dashboard', url: '/faculty' },
        { name: 'My Classes', url: '/faculty/classes' },
        { name: 'Records', url: '/faculty/records' },
        { name: 'My Profile', url: '/faculty/profile' },
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
