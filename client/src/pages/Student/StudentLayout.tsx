import { useAuthentication } from '@/hooks/AuthenticationQueries'
import { SideNavbar } from '@/components/side-navbar'

export const StudentLayout = ({ children }: any) => {
    const { handleLogout } = useAuthentication()

    const studentLinks = [
        { name: 'Dashboard', url: '/' },
        { name: 'My Grades', url: '/grades' },
        { name: 'My Profile', url: '/profile' },
    ]

    return (
        <>
            <SideNavbar role={'student'} handleLogout={handleLogout} links={studentLinks}/>
            <main className="h-dvh student-content">
                { children }
            </main>
        </>
    )
}
