import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { useQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { useAuthStore } from "@/stores/auth/authSlice"

export const Profile = () => {
    const { user_id } = useAuthStore()

    const { data, error, isLoading, isError } = useQuery({
        queryFn: () => getStudentInformation(user_id),
        queryKey: ['student_data', user_id],
        enabled: !!user_id
    })

    // if (isLoading) {
    //     console.log('loading student...')
    // }
    
    if (isError) {
        console.log(error)
    }

    if (data) {
        // const [ student ] = data
        console.log(data)
    }



    return (
        <StudentLayout>
            <StudentContainer>
                Profile
                <div>
                    {isLoading? 
                        (<div>Loading...</div>) 
                        : 
                        (data && data.map(({ firstname, moreInfo: { middlename, lastname } }: any, index: number) => (
                            <div key={index}>
                                { firstname }{ middlename }{ lastname }
                            </div>
                        )))
                    }
                    
                </div>
            </StudentContainer>
        </StudentLayout>
    )
}
