import OOK_logo from '../../assets/ook_logo.png'
import { Link } from 'react-router-dom'
import { useAuthentication } from '@/hooks/useAuthentication'

export const FacultyLayout = ({ children }: any) => {
    const { logoutUser } = useAuthentication()

    function handleLogout() {
        logoutUser.mutate()
        window.location.href = '/home'
    }

    return (
        <>
            <nav className="nav-student h-dvh shadow">
                <div className="logo-cont shadow-md">
                    <img src={OOK_logo} alt="ook_logo"/>
                    <div className="leading-3 h-full">
                        <span className="text-xl font-medium">OOK</span> <br />
                        Faculty
                    </div>
                </div>
                <div className="student-links">
                    <Link to={'/faculty'}>
                        <div className="student-nav-link w-full">
                            Dashboard
                        </div>
                    </Link>
                    <Link to={'/faculty/classes'}>
                        <div className="student-nav-link w-full">
                            My Classes
                        </div>
                    </Link>
                    <Link to={'/faculty/profile'}>
                        <div className="student-nav-link w-full">
                            My Profile
                        </div>
                    </Link>
                    <div className="student-nav-link w-full" id="logout-btn-in-links" onClick={handleLogout}>
                        Log Out
                    </div>
                </div>
            </nav>
            <main className="h-dvh student-content">
                { children }
            </main>
        </>
    )
}
