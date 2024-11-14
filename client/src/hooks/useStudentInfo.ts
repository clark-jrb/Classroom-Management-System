import { useAuthStore } from "@/stores/auth/authSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentInformation } from "@/services/UserService";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { studentInfoSchema } from "@/schemas/studentSchemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import moment from "moment";
import { updateStudentInfo } from "@/services/StudentService";

export const studentInfo = () => {
    const { user_id } = useAuthStore()
    const { updateInfo } = studentFunctions()

    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id),
        enabled: !!user_id,
    })

    const { student_info } = data || {}
    const { firstname, middlename, lastname, email, sex, contact, birth_date, gradeLevel } = student_info || {}
    const fullName = `${firstname} ${middlename} ${lastname}`
    const grade = gradeLevel

    const studentData = [
        { label: 'First Name', value: firstname },
        { label: 'Middle Name', value: middlename },
        { label: 'Last Name', value: lastname },
        { label: 'Email', value: email },
        { label: 'Sex', value: sex },
        { label: 'Grade Level', value: gradeLevel },
        { label: 'Contact', value: contact },
        { label: 'Birth Date', value: moment(birth_date).format('LL') },
    ]
    
    if (isError) console.log('there is an error: ' + error) 

    // student info form for dialog
    const studentForm = useForm<z.infer<typeof studentInfoSchema>>({
        resolver: zodResolver(studentInfoSchema)
    })

    useEffect(() => {
        if (data) {
            studentForm.reset({
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                email: email,
                sex: sex,
                contact: contact,
                birth_date: new Date(birth_date)
            });
        }
    }, [data, studentForm]);

    function onSubmit(values: z.infer<typeof studentInfoSchema>) {
        updateInfo.mutateAsync(values)
        console.log(values)
    }

    function onError (errors: any) {
        console.log("Form errors:", errors)
    }

    return { studentData, fullName, grade, isLoading, isError, isSuccess, error, studentForm, onSubmit, onError }
}

// this is where the student functions 
export const studentFunctions = () => {
    const { user_id } = useAuthStore()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)

    const updateInfo = useMutation({
        mutationFn: (value: Record<string, any>) => updateStudentInfo(user_id, value),
        onSuccess: (data) => {
            const { message } = data
            queryClient.invalidateQueries({ queryKey: ['student_data', user_id] })
            
            console.log(message)
            setOpen(false)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return { updateInfo, open, setOpen }
}