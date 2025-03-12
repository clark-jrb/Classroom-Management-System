import { TeacherData } from '@/types/teacher.types'
import { UseQueryResult } from '@tanstack/react-query'
import { ArrowUpRight, LoaderCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const DataCountCard = <T,>({ dataQuery, label, icon, route }: {
    dataQuery: UseQueryResult<T[], unknown>,
    label: string,
    icon: React.ReactNode
    route: string
}) => {
    const { data, isLoading } = dataQuery

    function countTeacherRole(role: string) {
        const teachers = data as TeacherData[]
        const count = teachers.filter(item => item.teacher_role === role).length

        return count
    }

    return (
        <div className="card-data-count w-[17rem] h-[9rem] rounded-xl p-4">
            {isLoading && 
                <div className='w-full h-full flex justify-center items-center'>
                    <LoaderCircle className="animate-spin text-red" color="gray"/>
                </div>
            }
            {data && 
                <div className='h-full flex flex-col justify-between'>
                    <div className="flex">
                        <div className="text-gray-500 text-sm">
                            {label}
                        </div>
                        {icon}
                    </div>
                    <div className="w-inherit flex gap-4">
                        <div className="text-6xl text-navy">
                            {data.length}
                        </div>
                        {route === 'teachers' &&
                            <div>
                                <div className='flex gap-2 items-center'>
                                    <div className='text-gray-500 text-xs'>Homeroom:</div>
                                    <div className='text-navy text-lg'>{countTeacherRole('homeroom')}</div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='text-gray-500 text-xs'>Subject:</div>
                                    <div className='text-navy text-lg ms-auto'>{countTeacherRole('subject')}</div>
                                </div>
                            </div>
                        }
                        <div className='ms-auto flex flex-col justify-end'>
                            <Link to={`/${route}`}>
                                <ArrowUpRight strokeWidth={1} color='gray' size={'2rem'}/>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
