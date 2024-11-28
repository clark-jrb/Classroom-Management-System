import OOK_logo from '../../assets/ook_logo.png'
import { Link } from 'react-router-dom'
import { useAuthentication } from '@/hooks/useAuthentication'

export const StudentLayout = ({ children }: any) => {
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
                        Student
                    </div>
                </div>
                <div className="student-links">
                    <Link to={'/'}>
                        <div className="student-nav-link w-full">
                            Dashboard
                        </div>
                    </Link>
                    <Link to={'/grades'}>
                        <div className="student-nav-link w-full">
                            My Grades
                        </div>
                    </Link>
                    <Link to={'/profile'}>
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
