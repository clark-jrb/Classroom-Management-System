import { FacultyLayout } from "./FacultyLayout"
import { Container } from "@/components/Container"
import { Suspense } from "react"
import { ProfileContent } from "../Student/Profile/ProfileContent"
import { useTeacherData } from "@/hooks/useTeacherQuery"
import { LoaderCircle } from "lucide-react"

export const FacultyProfile = () => {
    return (
        <FacultyLayout>
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
        </FacultyLayout>
    )
}


const ProfileMain = () => {
    const { data } = useTeacherData()
    return <ProfileContent user_data={data}/>
}

