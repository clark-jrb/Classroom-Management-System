import { useStudentsGPA } from "@/hooks/useTaskQueries"
import { useTeacherData } from "@/hooks/useTeacherQueries"


export const Evaluation = () => {
    const { data: teacher_data } = useTeacherData()
    const { teacher_role, grade_assigned, section_handled } = teacher_data.classes
    
    if (teacher_role !== 'homeroom' || section_handled.length > 1) {
        return (
            <div>
                You are not homeroom teacher
            </div>
        )
    }

    const section = section_handled.join('')

    const { data: students_gpas } = useStudentsGPA(grade_assigned, section)

    console.log(students_gpas)

    return (
        <div>
            Evaluation
        </div>
    )
}
