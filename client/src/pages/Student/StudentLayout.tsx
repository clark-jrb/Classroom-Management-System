
export const StudentLayout = ({ children }: any) => {
    return (
        <>
            <nav className="nav-student h-dvh">
                this is navigation menu for student
            </nav>
            <main className="h-dvh student-content">
                { children }
            </main>
        </>
    )
}
