import React from 'react'
import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/Container"
import { Route, Routes, Link, useLocation, Navigate } from "react-router-dom"
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
import { LoaderCircle } from 'lucide-react'

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
                <div className='space-y-4 h-full flex flex-col'>
                    <Breadcrumb className=" border-b border-light_navy leading-none">
                        <BreadcrumbList>
                            <BreadcrumbItem className='text-xl text-navy pb-4 '>
                                <Link to={'/records'} className='leading-none'>Records</Link>
                            </BreadcrumbItem>
                            {recordsLinks.map(({ path_name, name }, index) => 
                                (currentPath === `/records/${path_name}` && 
                                    <React.Fragment key={index}>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbPage className='text-navy'>
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
                                            <BreadcrumbPage className='text-navy'>
                                                View
                                            </BreadcrumbPage>
                                    </React.Fragment>)
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Routes>
                        {recordsLinks.map(({ path_name }, index) => (
                            <Route key={index} path={path_name} element={
                                <Suspense fallback={
                                    <div className="flex-1 flex justify-center items-center">
                                        <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                                    </div>
                                }>
                                    {path_name === '' ? <Records/> : <TaskPage task_type={path_name as TaskTypes}/>}
                                </Suspense>
                            }/>
                        ))}
                        <Route path=':id/view/:taskId' element={<TaskView/>}/>
                        <Route path="*" element={<Navigate to="/records" replace/>} />
                    </Routes>
                </div>
            </Container>
        </FacultyLayout>
    )
}
