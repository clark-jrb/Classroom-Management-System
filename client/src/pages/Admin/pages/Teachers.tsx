import { Container } from "@/components/Container"
import { AdminLayout } from "../AdminLayout"
import { TeacherData } from "@/types/teacher.types"
import { DataTable } from "./teachers/data-table"
import { columns } from "./teachers/columns"
import { useTeachersData } from "@/hooks/useAdminQuery"


export const Teachers = () => {
    const { data, isLoading, isError, error } = useTeachersData()

    return (
        <AdminLayout>
            <Container>
                {data &&
                    <div className='h-full w-full flex flex-col'>
                        <div className='flex-[1]'>
                            <h2 className='text-xl'> Manage Students</h2>
                        </div>
                        <TeachersTable data={data}/>
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

const TeachersTable = ({ data }: {
    data: TeacherData[]
}) => {
    return (
        <div className='flex-[14]'>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}