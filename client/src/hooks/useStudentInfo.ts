import { useAuthStore } from "@/stores/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "@/services/UserService";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { studentInfoSchema } from "@/schemas/studentSchemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import moment from "moment";

export const studentInfo = () => {
    const { user_id } = useAuthStore()

    const { data, isLoading, isError, error } = useQuery({
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
        resolver: zodResolver(studentInfoSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            email: "",
            sex: "",
            contact: "",
        },
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