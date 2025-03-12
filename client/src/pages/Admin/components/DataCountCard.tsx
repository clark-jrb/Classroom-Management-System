

import { UseQueryResult } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

export const DataCountCard = <T,>({ dataQuery, label, icon }: {
    dataQuery: UseQueryResult<T[], unknown>,
    label: string,
    icon: React.ReactNode
}) => {
    const { data, isLoading } = dataQuery

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
                    <div className="w-inherit">
                        <div className="text-6xl text-navy">
                            {data.length}
                        </div>
                </div>
                </div>
            }
        </div>
    )
}
