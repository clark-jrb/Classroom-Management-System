import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { studentPersonalSchema } from "@/schemas/studentSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import moment from "moment"
import { updateStudentInfo } from "@/services/StudentService"

export const studentInfo = () => {
    const { studentData } = studentFunctions()

    // destructure data from the api
    const { account, personal, classes } = studentData || {}
    const { email } = account || {}
    const { firstname, middlename, lastname, sex, contact, birth_date } = personal || {}
    const { gradeLevel, section } = classes || {}
    const fullName = `${firstname} ${middlename} ${lastname}`
    const grade = gradeLevel

    const studentDataOnUi = [
        { label: 'First Name', value: firstname },
        { label: 'Middle Name', value: middlename },
        { label: 'Last Name', value: lastname },
        { label: 'Email', value: email },
        { label: 'Sex', value: sex },
        { label: 'Grade & Section', value: `${gradeLevel}, ${section}` },
        { label: 'Contact', value: contact },
        { label: 'Birth Date', value: moment(birth_date).format('LL') },
    ]
    
    // student info form for dialog
    const studentForm = useForm<z.infer<typeof studentPersonalSchema>>({
        resolver: zodResolver(studentPersonalSchema)
    })

    // fill the dialog with data
    useEffect(() => {
        if (studentData) {
            studentForm.reset(personal)
        }
    }, [studentData, studentForm])

    return { studentDataOnUi, fullName, grade, studentForm, personal }
}

// this is where the student functions 
export const studentFunctions = () => {
    const queryClient = useQueryClient()
    const { user_id } = useAuthStore()
    const [openDialog, setOpenDialog] = useState(false) // this is only for editing personal information

    // get student informations (account, personal, classes)
    const getStudentData = useQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id),
        enabled: !!user_id,
    })

    if (getStudentData.isError) console.log('there is an error: ' + getStudentData.error) 

    const studentData = getStudentData.data

    // student update information
    const updateInfo = useMutation({
        mutationFn: (value: Record<string, any>) => updateStudentInfo(user_id, value), // post in the api
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student_data', user_id] }) // refetch data
            console.log('success on hook')
            setOpenDialog(false) // close dialog
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return { studentData, updateInfo, openDialog, setOpenDialog }
}