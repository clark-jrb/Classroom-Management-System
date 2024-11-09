import { useAuthStore } from "@/stores/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "@/services/UserService";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { studentInfoSchema } from "@/schemas/studentSchemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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

    // student info form for dialog
    const studentForm = useForm<z.infer<typeof studentInfoSchema>>({
        resolver: zodResolver(studentInfoSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            email: "",
            sex: "",
            contact: 0,
        },
    })

    useEffect(() => {
        if (data) {
            studentForm.reset({
                firstname: data.firstname,
                middlename: data.moreInfo?.middlename,
                lastname: data.moreInfo?.lastname,
                email: data.email,
                sex: data.moreInfo?.sex,
                contact: data.moreInfo?.contact,
            });
        }
    }, [data, studentForm]);

    function onSubmit(values: z.infer<typeof studentInfoSchema>) {
        console.log(values)
    }

    function onError (errors: any) {
        console.log("Form errors:", errors)
    }

    return { studentData, fullName, grade, isLoading, isError, error, studentForm, onSubmit, onError }
}