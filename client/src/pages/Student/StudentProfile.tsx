import { Container } from "@/components/Container"
import { StudentLayout } from "./StudentLayout"
import { ProfileContent } from "./Profile/ProfileContent"
import { Suspense } from "react"
import { useStudentData } from "@/hooks/useStudentQuery"
import { LoaderCircle } from "lucide-react"

export const StudentProfile = () => {
    return (
        <StudentLayout>
            <Container>
                <div className="h-full flex flex-col gap-6">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        Profile
                    </div>
                    <Suspense fallback={
                        <div className="flex-1 flex justify-center items-center">
                            <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                        </div>
                    }>
                        <ProfileMain/>
                    </Suspense>
                </div>
            </Container>
        </StudentLayout>
    )
}

const ProfileMain = () => {
    const { data } = useStudentData()
    return <ProfileContent user_data={data}/>
}