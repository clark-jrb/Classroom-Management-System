import { z } from "zod"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import moment from "moment"
import { getTeacherInformation } from "@/services/UserService"


export const teacherInfo = () => {
    const { user_id } = useAuthStore()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getTeacherInformation(user_id),
        enabled: !!user_id,
    })

    if (isLoading) {
        console.log('loading teacher data...')
    }

    if (isError) {
        console.log(error)
    }

    // destructure data from the api
    const { classes } = data || {}
    // const { email } = account || {}
    // const { firstname, middlename, lastname, sex, contact, birth_date } = personal || {}
    // const { teacher_role, grade_assigned, section_handled, subjects } = classes || {}

    return { classes }
}