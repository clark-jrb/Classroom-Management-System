import { Container } from "@/components/Container"
import { AdminLayout } from "../AdminLayout"
import { TeacherData } from "@/types/teacher.types"
import { DataTable } from "./teachers/data-table"
import { columns } from "./teachers/columns"


export const Teachers = () => {
    return (
        <AdminLayout>
            <Container>
                Manage teachers page
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