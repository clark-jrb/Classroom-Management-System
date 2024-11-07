import { useAuthStore } from "@/stores/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getStudentInformation } from "@/services/UserService";

export const studentInfo = () => {
    const { user_id } = useAuthStore()

    return useQuery({
        queryKey: ['student_data', user_id],
        queryFn: () => getStudentInformation(user_id),
        enabled: !!user_id,
    })
}