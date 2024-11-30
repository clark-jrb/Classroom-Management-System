import { useSuspenseQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { StudentDashboard } from "./Student/StudentDashboard"
import { Grades } from "./Student/Grades"
import { StudentProfile } from "./Student/StudentProfile"
import { FacultyDashboard } from "./Faculty/FacultyDashboard"
import { MyClasses } from "./Faculty/MyClasses"
import { RecordContainer } from "./Faculty/StudentRecord/RecordContainer"
import { FacultyProfile } from "./Faculty/FacultyProfile"

export const AuthenticatedRoutes = () => {
    const { setRole, setUserId } = useAuthStore()
    
    const { data } = useSuspenseQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    })
    
    useEffect(() => {
        if (data && data.currentUser) {
            setRole(data.currentUser.role);
            setUserId(data.currentUser._id);
        }
    }, [data, setRole, setUserId]);

    const studentRoutes = [
        { path: '/', element: <StudentDashboard/> },
        { path: '/grades', element: <Grades/> },
        { path: '/profile', element: <StudentProfile/> }
    ]
    
    const facultyRoutes = [
        { path: '/', element: <FacultyDashboard/> },
        { path: '/classes', element: <MyClasses/> },
        { path: '/records/*', element: <RecordContainer/> },
        { path: '/profile', element: <FacultyProfile/> }
    ]

    return (
        <Routes>
            {data.currentUser.role === 'student' && (
                studentRoutes && studentRoutes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element}/>
                ))
            )}
            
            {data.currentUser.role === 'faculty' && (
                facultyRoutes && facultyRoutes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element}/>
                ))
            )}

            <Route path="*" element={<div>Forbidden</div>} />
        </Routes>
    )
}