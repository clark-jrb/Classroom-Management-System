import { AdminLayout } from '../AdminLayout'
import { Container } from '@/components/Container'
import { useStudentsData } from '@/hooks/useAdminQuery'

export const Students = () => {
    const { data } = useStudentsData()

    if (data) {
        console.log(data)
    }
    return (
        <AdminLayout>
            <Container>
                Manage students page
            </Container>
        </AdminLayout>
    )
}
