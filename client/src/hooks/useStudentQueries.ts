import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getStudentInformation } from "@/services/UserService"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { studentPersonalSchema } from "@/schemas/studentSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import moment from "moment"
import { updateStudentInfo } from "@/services/StudentService"
import { getChangedFields } from "@/helpers/changed-fields"
import { useStudentDialogStore } from "@/stores/studentSlice"

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



    return { studentDataOnUi, fullName, grade, studentForm, personal }
}

export const updatePersonalForm = () => {
    const { personal } = studentInfo()
    const { updatePersonal } = studentFunctions()
    const { studentData } = studentFunctions()

    // student info form for dialog
    const personalForm = useForm<z.infer<typeof studentPersonalSchema>>({
        resolver: zodResolver(studentPersonalSchema)
    })

    function onSubmit(values: z.infer<typeof studentPersonalSchema>) {
        const getChanges = getChangedFields(personal, values)

        if (Object.keys(getChanges).length !== 0) {
            updatePersonal.mutate(getChanges)
            console.log(values)
            console.log('update successful')
        } else {
            console.log('there is nothing to update')
        }
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    // fill the dialog with data
    useEffect(() => {
        if (studentData) {
            personalForm.reset(personal)
        }
    }, [studentData, personalForm])

    return { personalForm, onSubmit, onError }
}

// this is where the student functions 
export const studentFunctions = () => {
    const queryClient = useQueryClient()
    const { user_id } = useAuthStore()
    const { openDialog } = useStudentDialogStore()

    // get student informations (account, personal, classes)
    const getStudentData = useSuspenseQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id),
        // enabled: !!user_id,
    })

    if (getStudentData.isError) console.log('there is an error: ' + getStudentData.error) 

    const studentData = getStudentData.data || {}

    // student update information
    const updatePersonal = useMutation({
        mutationFn: (value: Record<string, any>) => updateStudentInfo(user_id, value), // post in the api
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student_data', user_id] }) // refetch data
            console.log('success on hook')
            openDialog(false) // close dialog
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return { studentData, updatePersonal }
}