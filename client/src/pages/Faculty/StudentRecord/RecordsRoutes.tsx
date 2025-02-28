import React from 'react'
import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/Container"
import { Route, Routes, Link, useLocation } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { Records } from './Records'
import { TaskView } from './component/TaskView'
import { Suspense } from 'react'
import { TaskPage } from './pages/TaskPage'
import { TaskTypes } from '@/types/global.types'

export const RecordsRoutes = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const recordsLinks = [
        { name: 'Records', path_name: '' },
        { name: 'Quizzes', path_name: 'quiz' },
        { name: 'Activities', path_name: 'activity' },
        { name: 'Exams', path_name: 'exam' },
        { name: 'Summatives', path_name: 'summative' },
        { name: 'Projects', path_name: 'project' },
        { name: 'Recitations', path_name: 'recitation' }
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
                    {recordsLinks.map(({ path_name }, index) => (
                        <Route key={index} path={path_name} element={
                            <Suspense fallback={<div>loading...</div>}>
                                {path_name === '' ? <Records/> : <TaskPage task_type={path_name as TaskTypes}/>}
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
