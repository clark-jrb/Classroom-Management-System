import { useAuthStore, useTeacherStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { StudentDashboard } from "./Student/StudentDashboard"
import { MyGrades } from "./Student/Grades/MyGrades"
import { StudentProfile } from "./Student/StudentProfile"
import { FacultyDashboard } from "./Faculty/FacultyDashboard"
import { RecordsRoutes } from "./Faculty/StudentRecord/RecordsRoutes"
import { FacultyProfile } from "./Faculty/FacultyProfile"
import { ComputationsRoutes } from "./Faculty/Computations/ComputationsRoutes"
import { GradesRoutes } from "./Faculty/StudentGrades/GradesRoutes"
import { useCurrentUser } from "@/hooks/useUsersQuery"
import { EvaluationPage } from "./Faculty/Evaluation/EvaluationPage"
import { MyClassesRoutes } from "./Faculty/MyClasses/MyClassesRoutes"
import { AdminDashboard } from "./Admin/AdminDashboard"
import { useCurrentQuarter } from "@/hooks/useAdminQuery"
import { useCurrentQuarterStore } from "@/stores/globalSlice"

/**
 * Function to fetch current user authenticated on the server
 */

const currentAuthenticated = () => {
    const { setRole, setUserId } = useAuthStore() /* Prepare the zustand global store (state) */
    const { setTeacherRole } = useTeacherStore()
    const { data } = useCurrentUser()
    const { currentUser } = data
    
    /* Set role and the current user id on auth store to be accessible on children  */
    useEffect(() => {
        const user_role = currentUser.role

        /* If data is not undefined (usually it is undefined on first call) */
        if (data) {
            setRole(user_role)
            setUserId(currentUser._id)

            if (user_role === 'faculty') {
                setTeacherRole(currentUser.details.teacher_role)
            }
        }
    }, [data, setRole, setUserId])
}

const setTheCurrentQuarter = () => {
    const { setCurrentQuarter } = useCurrentQuarterStore()
    const { data } = useCurrentQuarter()

    useEffect(() => {
        if (data) {
            setCurrentQuarter(data.current_quarter)
        }
    }, [data])
}


/**
 * Authenticated Routes
 */

export const AuthenticatedRoutes = () => {
    currentAuthenticated()  /* Function to set role on auth store */
    setTheCurrentQuarter()
    const { role } = useAuthStore()

    /**
     * Student routes (CAN add/delete routes but don't forget 
     * the element (react component)) so it is easy to maintain
     */
    const studentRoutes = [
        { path: '/', element: <StudentDashboard/> },
        { path: '/grades', element: <MyGrades/> },
        { path: '/profile', element: <StudentProfile/> }
    ] 

    /* Same as the student routes but faculty */
    const facultyRoutes = [
        { path: '/', element: <FacultyDashboard/> },
        { path: '/classes/*', element: <MyClassesRoutes/> },
        { path: '/records/*', element: <RecordsRoutes/> },
        { path: '/computations/*', element: <ComputationsRoutes/> },
        { path: '/grades/*', element: <GradesRoutes/> },
        { path: '/evaluation/*', element: <EvaluationPage/> },
        { path: '/profile', element: <FacultyProfile/> }
    ] 

    const adminRoutes = [
        { path: '/', element: <AdminDashboard/> },
    ]

    return (
        <Routes>
            {/* If role is student, then it will load all its routes */}
            {role === 'student' && ( 
                /* Map student routes array with paths and elements */
                studentRoutes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element}/>
                ))
            )}
            
            {role === 'faculty' && (
                /* Map faculty routes array with paths and elements */
                facultyRoutes.map(({ path, element }, index) => ( 
                    <Route key={index} path={path} element={element}/>
                ))
            )}

            {role === 'admin' && (
                adminRoutes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element}/>
                ))
            )}

            {/**
             * Fallback when a user accessed a different route 
             * (ex. You are student but you CANNOT access faculty routes!)
             */}
            {role && <Route path="*" element={<Navigate to="/" replace/>} />}
        </Routes>
    )
}