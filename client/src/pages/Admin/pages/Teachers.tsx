import { Container } from "@/components/Container"
import { AdminLayout } from "../AdminLayout"
import { TeacherData } from "@/types/teacher.types"
import { DataTable } from "./teachers/data-table"
import { columns } from "./teachers/columns"
import { useTeachersData } from "@/hooks/useAdminQuery"
import { LoaderCircle } from "lucide-react"


export const Teachers = () => {
    const { data, isLoading, isError, error } = useTeachersData()

    return (
        <AdminLayout>
            <Container>
                    <div className='h-full w-full flex flex-col'>
                        <div className='flex-[1]'>
                            <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                                Manage Teachers
                            </div>
                        </div>
                        {data &&
                                <TeachersTable data={data}/>
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

const TeachersTable = ({ data }: {
    data: TeacherData[]
}) => {
    return (
        <div className='flex-[14]'>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}