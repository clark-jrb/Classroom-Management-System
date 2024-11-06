import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { useStudentInfo } from "@/hooks/useStudentInfo"
import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'

export const Profile = () => {
    const [ data, error, isLoading, isError ] = useStudentInfo()  // this should be complete or else it won't load the loading UI

    if (error) {
        console.log('there is an error: ' + error)
    }

    return (
        <StudentLayout>
            <StudentContainer>
                <div className="h-full">
                    {isError ? 
                        <div>Error</div>
                        :  
                        (isLoading ? 
                            <div>Loading...</div> 
                            : 
                            data && data.map(({ 
                                firstname, 
                                email,
                                gradeLevel,
                                moreInfo: { 
                                    middlename, 
                                    lastname,
                                    sex,
                                    birthdate,
                                    contact
                                } 
                            }: any, index: number) => (
                                <div key={index} className="info-cont">
                                    {/* HEADER */}
                                    <div className="info-cont-head h-auto w-full">
                                        <div className="w-96">
                                            <div className="student-name mb-2">
                                                <p>
                                                    {firstname} {middlename} {lastname}
                                                </p>
                                            </div>
                                            <div className="flex mb-4">
                                                <Badge variant="outline">Grade&nbsp;{gradeLevel}</Badge>
                                                <span className="flex ms-auto text-sm">
                                                    Edit&nbsp;<PenEdit className="h-5"/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* BODY */}
                                    <div className="info-cont-body pt-8 h-full w-full">
                                        <div className="w-96 flex flex-col gap-5">
                                            <div className="info-data-cont" id="firstname">
                                                <label htmlFor="firstname">First Name:</label>
                                                <span className="text-lg">{firstname}</span>
                                            </div>
                                            <div className="info-data-cont" id="middlename">
                                                <label htmlFor="middlename">Middle Name:</label>
                                                <span className="text-lg">{middlename}</span>
                                            </div>
                                            <div className="info-data-cont" id="lastname">
                                                <label htmlFor="lastname">Last Name:</label>
                                                <span className="text-lg">{lastname}</span>
                                            </div>
                                            <div className="info-data-cont" id="email">
                                                <label htmlFor="email">Email:</label>
                                                <span className="text-lg">{email}</span>
                                            </div>
                                            <div className="info-data-cont" id="contact">
                                                <label htmlFor="contact">Contact:</label>
                                                <span className="text-lg">{contact}</span>
                                            </div>
                                            <div className="info-data-cont" id="sex">
                                                <label htmlFor="sex">Sex:</label>
                                                <span className="text-lg">{sex}</span>
                                            </div>
                                            <div className="info-data-cont" id="birthdate">
                                                <label htmlFor="birthdate">Birth Date:</label>
                                                <span className="text-lg">{birthdate}</span>
                                            </div>
                                            <div className="info-data-cont" id="address">
                                                <label htmlFor="address">Address:</label>
                                                <span className="text-lg"></span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            ))
                        )
                    }
                </div>
            </StudentContainer>
        </StudentLayout>
    )
}
