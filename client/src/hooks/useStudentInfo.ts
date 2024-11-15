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

    const { data, isLoading: studentInfoLoading, isError: studentInfoError, error } = useQuery({
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
    
    if (studentInfoError) console.log('there is an error: ' + error) 

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

    return { studentData, fullName, grade, studentInfoLoading, studentInfoError, error, studentForm }
}

// this is where the student functions 
export const studentFunctions = () => {
    const { user_id } = useAuthStore()
    const queryClient = useQueryClient()
    const [openDialog, setOpenDialog] = useState(false);

    const updateInfo = useMutation({
        mutationFn: (value: Record<string, any>) => updateStudentInfo(user_id, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student_data', user_id] })
            console.log('success on hook')
            setOpenDialog(false)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return { updateInfo, openDialog, setOpenDialog }
}