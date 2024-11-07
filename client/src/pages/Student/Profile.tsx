import { StudentContainer } from "@/components/student-container"
import { StudentLayout } from "./StudentLayout"
import { studentInfo } from "@/hooks/useStudentInfo"
import { Badge } from "@/components/ui/badge"
import { ReactComponent as PenEdit } from '@/assets/icons/pen-edit.svg'
// import { Label } from "@radix-ui/react-label"

export const Profile = () => {
    const { data, error, isLoading, isError } = studentInfo()  // this should be complete or else it won't load the loading UI

    const { firstname, email, gradeLevel, moreInfo } = data || {}

    const studentData = [
        { label: 'First Name', value: firstname },
        { label: 'Middle Name', value: moreInfo?.middlename },
        { label: 'Last Name', value: moreInfo?.lastname },
        { label: 'Email', value: email },
        { label: 'Sex', value: moreInfo?.sex },
        { label: 'Grade Level', value: gradeLevel },
        { label: 'Contact', value: moreInfo?.contact },
        { label: 'Birth Date', value: moreInfo?.birthdate },
    ]

    if (isError) console.log('there is an error: ' + error) 

    return (
        <StudentLayout>
            <StudentContainer>
                <div className="h-full">
                    {isError && <div>Error</div>}
                    {isLoading && <div>Loading...</div>}
                    {data && 
                        <div className="info-cont">
                            {/* HEADER */}
                            <div className="info-cont-head h-auto w-full">
                                <div className="w-96">
                                    <div className="student-name mb-2">
                                        <p>
                                            {firstname} {moreInfo?.middlename} {moreInfo?.lastname}
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
                                    {studentData.map(({ label, value }, index: number) => (
                                        <div key={index} className="info-data-cont" id={label}>
                                            <label htmlFor={label}>{label}:</label>
                                            <span className="text-lg">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            
                        </div>
                    }
                </div>
            </StudentContainer>
        </StudentLayout>
    )
}
