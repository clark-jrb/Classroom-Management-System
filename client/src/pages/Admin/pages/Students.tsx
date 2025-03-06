import { AdminLayout } from '../AdminLayout'
import { Container } from '@/components/Container'
import { useStudentsData } from '@/hooks/useAdminQuery'
import { StudentData } from '@/types/student.types'
import { DataTable } from './students/data-table'
import { columns } from './students/columns'

export const Students = () => {
    const { data, isLoading, isError, error } = useStudentsData()

    return (
        <AdminLayout>
            <Container>
                {data &&
                    <div className='h-full w-full flex flex-col'>
                        <div className='flex-[1]'>
                            <h2 className='text-xl'> Manage Students</h2>
                        </div>
                        <StudentsTable data={data}/>
                    </div>
                }
                {isLoading &&
                    <div>Loading...</div>
                }
                {isError &&
                    <div>{error.message}</div>
                }
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
