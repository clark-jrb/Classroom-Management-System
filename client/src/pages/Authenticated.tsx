import { useAuthStore, useTeacherStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { StudentDashboard } from "./Student/StudentDashboard"
import { MyGrades } from "./Student/Grades/MyGrades"
import { StudentProfile } from "./Student/StudentProfile"
import { FacultyDashboard } from "./Faculty/FacultyDashboard"
import { MyClasses } from "./Faculty/MyClasses"
import { RecordsRoutes } from "./Faculty/StudentRecord/RecordsRoutes"
import { FacultyProfile } from "./Faculty/FacultyProfile"
import { ComputationsRoutes } from "./Faculty/Computations/ComputationsRoutes"
import { GradesRoutes } from "./Faculty/StudentGrades/GradesRoutes"
import { useCurrentUser } from "@/hooks/useAuthQueries"
import { EvaluationPage } from "./Faculty/Evaluation/EvaluationPage"

// GET current user logged in on the server
const currentAuthenticated = () => {
    const { setRole, setUserId } = useAuthStore() // prepare the zustand global store (state)
    const { setTeacherRole } = useTeacherStore()
    const { data } = useCurrentUser()
    const { currentUser } = data
    
    useEffect(() => {
        const user_role = currentUser.role

        if (data) { // if data is not undefined (usually it is undefined on first call)
            setRole(user_role)
            setUserId(currentUser._id)

            if (user_role === 'faculty') {
                setTeacherRole(currentUser.details.teacher_role)
            }
        } // set role and the current user id on store to be accessible on children 
    }, [data, setRole, setUserId])
}

// Authenticated Routes
export const AuthenticatedRoutes = () => {
    currentAuthenticated()  // function to set role on auth store
    const { role } = useAuthStore()

    const studentRoutes = [
        { path: '/', element: <StudentDashboard/> },
        { path: '/grades', element: <MyGrades/> },
        { path: '/profile', element: <StudentProfile/> }
    ] // student routes (can add/delete routes but don't forget the element (react component)) so it is easy to maintain
    
    const facultyRoutes = [
        { path: '/', element: <FacultyDashboard/> },
        { path: '/classes', element: <MyClasses/> },
        { path: '/records/*', element: <RecordsRoutes/> },
        { path: '/computations/*', element: <ComputationsRoutes/> },
        { path: '/grades/*', element: <GradesRoutes/> },
        { path: '/evaluation/*', element: <EvaluationPage/> },
        { path: '/profile', element: <FacultyProfile/> }
    ] // same as the student routes but faculty

    return (
        <Routes>
            {role === 'student' && ( // if role is student, then i will load all its routes
                studentRoutes.map(({ path, element }, index) => ( // map student routes array with paths and elements
                    <Route key={index} path={path} element={element}/>
                ))
            )}
            
            {role === 'faculty' && (
                facultyRoutes.map(({ path, element }, index) => ( // map faculty routes array with paths and elements
                    <Route key={index} path={path} element={element}/>
                ))
            )}
            {/* Fallback when a user accessed a different route (ex. you are student but you cannot access faculty routes!) */}
            <Route path="*" element={<div>Forbidden</div>} /> 
        </Routes>
    )
}