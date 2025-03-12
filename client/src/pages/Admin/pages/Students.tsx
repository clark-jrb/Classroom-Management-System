import { AdminLayout } from '../AdminLayout'
import { Container } from '@/components/Container'
import { useStudentsData } from '@/hooks/useAdminQuery'
import { StudentData } from '@/types/student.types'
import { DataTable } from './students/data-table'
import { columns } from './students/columns'
import { LoaderCircle } from 'lucide-react'

export const Students = () => {
    const { data, isLoading, isError, error } = useStudentsData()

    return (
        <AdminLayout>
            <Container>
                <div className='h-full w-full flex flex-col'>
                    <div className='flex-[1]'>
                        <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                            Manage Students
                        </div>
                    </div>
                        {data &&
                                <StudentsTable data={data}/>
                            }
                        {isLoading &&
                            <div className='flex-[14] flex justify-center items-center'>
                                <LoaderCircle 
                                    className="animate-spin text-red" 
                                    color="gray"
                                    size={'3rem'}
                                />
                            </div>
                        }
                        {isError &&
                            <div>{error.message}</div>
                        }
                </div>
            </Container>
        </AdminLayout>
    )
}

const StudentsTable = ({ data }: {
    data: StudentData[]
}) => {
    return (
        <div className='flex-[14]'>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
