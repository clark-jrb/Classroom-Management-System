import { useAuthStore } from "@/stores/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "@/services/UserService";

export const useStudentInfo = () => {
    const { user_id } = useAuthStore()

    const { data, error, isLoading, isError } = useQuery({
        queryFn: () => getStudentInformation(user_id),
        queryKey: ['student_data', user_id],
        enabled: !!user_id
    })

    return [ data, error, isLoading, isError ]
}