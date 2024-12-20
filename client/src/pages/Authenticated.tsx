import { useSuspenseQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { StudentDashboard } from "./Student/StudentDashboard"
import { MyGrades } from "./Student/MyGrades"
import { StudentProfile } from "./Student/StudentProfile"
import { FacultyDashboard } from "./Faculty/FacultyDashboard"
import { MyClasses } from "./Faculty/MyClasses"
import { RecordContainer } from "./Faculty/StudentRecord/RecordContainer"
import { FacultyProfile } from "./Faculty/FacultyProfile"
import { Computations } from "./Faculty/Computations/Computations"

// GET current user logged in on the server
const currentAuthenticated = () => {
    const { setRole, setUserId, role } = useAuthStore() // prepare the zustand global store (state)
    
    const { data } = useSuspenseQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser, // get current user on the server
    })
    
    useEffect(() => {
        if (data && data.currentUser) { // if data is not undefined (usually it is undefined on first call)
            setRole(data.currentUser.role);
            setUserId(data.currentUser._id);
        } // set role and the current user id on store to be accessible on children 
    }, [data, setRole, setUserId]);

    return { role } // send the role to the authenticated routes
}

// Authenticated Routes
export const AuthenticatedRoutes = () => {
    const { role } = currentAuthenticated() // get role from the current user on the server

    const studentRoutes = [
        { path: '/', element: <StudentDashboard/> },
        { path: '/grades', element: <MyGrades/> },
        { path: '/profile', element: <StudentProfile/> }
    ] // student routes (can add/delete routes but don't forget the element (react component)) so it is easy to maintain
    
    const facultyRoutes = [
        { path: '/', element: <FacultyDashboard/> },
        { path: '/classes', element: <MyClasses/> },
        { path: '/records/*', element: <RecordContainer/> },
        { path: '/computations', element: <Computations/> },
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