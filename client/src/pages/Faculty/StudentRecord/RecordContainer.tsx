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
import { Quizzes } from "./Quizzes"
import { Activities } from "./Activities"
import { RecordsHome } from "./RecordsHome"
import { Exams } from "./Exams"
import { Summatives } from "./Summatives"
import { Projects } from "./Projects"
import { Recitations } from "./Recitations"
import { teacherInfo } from '@/hooks/useTeacherInfo'

interface IRecordContainer {
    path: string
}

export const RecordContainer = ({ path }: IRecordContainer) => {
    const location = useLocation()
    const currentPath = location.pathname

    const { classes } = teacherInfo()

    if (classes) {
        console.log(classes)
    }

    const recordsLinks = [
        { name: 'Records', path_name: '/', element: <RecordsHome/> },
        { name: 'Quizzes', path_name: 'quiz', element: <Quizzes/> },
        { name: 'Activities', path_name: 'activity', element: <Activities/> },
        { name: 'Exams', path_name: 'exam', element: <Exams/> },
        { name: 'Summatives', path_name: 'summative', element: <Summatives/> },
        { name: 'Projects', path_name: 'project', element: <Projects/> },
        { name: 'Recitations', path_name: 'recitation', element: <Recitations/> },
    ]

    return (
        <FacultyLayout>
            <Container>
                <Breadcrumb className='mb-3'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to={path}>Records</Link>
                        </BreadcrumbItem>
                        {recordsLinks.map(({ path_name, name }, index) => 
                            currentPath === `${path}/${path_name}` && 
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbPage>
                                        {name}
                                    </BreadcrumbPage>
                                </React.Fragment>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                <Routes>
                    {recordsLinks.map(({ path_name, element }, index) => (
                        <Route key={index} path={path_name} element={element}/>
                    ))}
                </Routes>

            </Container>
        </FacultyLayout>
    )
}
