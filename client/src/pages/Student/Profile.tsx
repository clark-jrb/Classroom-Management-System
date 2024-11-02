import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { useStudentInfo } from "@/hooks/useStudentInfo"

export const Profile = () => {
    const [ data, isLoading, isError ] = useStudentInfo()

    return (
        <StudentLayout>
            <StudentContainer>
                Profile
                <div>
                    {isError? 
                        (<div>Error</div>)
                        :  
                        (isLoading? 
                            (<div>Loading...</div>) 
                            : 
                            (data && data.map(({ firstname, moreInfo: { middlename, lastname } }: any, index: number) => (
                                <div key={index}>
                                    { firstname }{ middlename }{ lastname }
                                </div>
                            )))
                        )
                    }
                </div>
            </StudentContainer>
        </StudentLayout>
    )
}
