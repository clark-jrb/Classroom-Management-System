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
                Manage students page
                {data &&
                    <StudentsTable data={data}/>
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
        <div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
