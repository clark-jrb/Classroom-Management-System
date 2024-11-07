import { useAuthStore } from "@/stores/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "@/services/UserService";

export const studentInfo = () => {
    const { user_id } = useAuthStore()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id),
        enabled: !!user_id,
    })

    const { firstname, email, gradeLevel, moreInfo } = data || {}
    const fullName = `${firstname} ${moreInfo?.middlename} ${moreInfo?.lastname}`
    const grade = gradeLevel

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

    return { studentData, fullName, grade, isLoading, isError, error }
}