import React from 'react'
import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/container"
import { Route, Routes, Link, useLocation } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { Quizzes } from "./pages/Quizzes"
import { Activities } from "./pages/Activities"
import { RecordsHome } from "./RecordsHome"
import { Exams } from "./pages/Exams"
import { Summatives } from "./pages/Summatives"
import { Projects } from "./pages/Projects"
import { Recitations } from "./pages/Recitations"
import { TaskView } from './component/TaskView'
import { Suspense } from 'react'

export const RecordContainer = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const recordsLinks = [
        { name: 'Records', path_name: '', element: <RecordsHome/> },
        { name: 'Quizzes', path_name: 'quiz', element: <Quizzes/> },
        { name: 'Activities', path_name: 'activity', element: <Activities/> },
        { name: 'Exams', path_name: 'exam', element: <Exams/> },
        { name: 'Summatives', path_name: 'summative', element: <Summatives/> },
        { name: 'Projects', path_name: 'project', element: <Projects/> },
        { name: 'Recitations', path_name: 'recitation', element: <Recitations/> }
    ]

    return (
        <FacultyLayout>
            <Container>
                <Breadcrumb className='mb-3'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to={'/records'}>Records</Link>
                        </BreadcrumbItem>
                        {recordsLinks.map(({ path_name, name }, index) => 
                            (currentPath === `/records/${path_name}` && 
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbPage>
                                        {name}
                                    </BreadcrumbPage>
                                </React.Fragment>) || 
                            (currentPath.startsWith(`/records/${path_name}/view/`) && 
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <Link to={`/records/${path_name}`}>
                                                {name}
                                            </Link>
                                        </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                        <BreadcrumbPage>
                                            View
                                        </BreadcrumbPage>
                                </React.Fragment>)
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                <Routes>
                    {recordsLinks.map(({ path_name, element }, index) => (
                        <Route key={index} path={path_name} element={
                            <Suspense fallback={<div>loading...</div>}>
                                {element}
                            </Suspense>
                        }/>
                    ))}
                    <Route path=':id/view/:taskId' element={
                        <Suspense fallback={<div>loading...</div>}>
                            <TaskView/>
                        </Suspense>
                    }/>
                </Routes>

            </Container>
        </FacultyLayout>
    )
}
