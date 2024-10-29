import OOK_logo from '../../assets/ook_logo.png'

export const StudentLayout = ({ children }: any) => {
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

                </div>
            </nav>
            <main className="h-dvh student-content">
                { children }
            </main>
        </>
    )
}
