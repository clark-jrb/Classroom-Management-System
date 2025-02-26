import { useMyStudentsData } from "@/hooks/useTeacherQueries"


export const MyStudentsTable = ({ section, grade_level }: {
    section: string
    grade_level: string
}) => {
    const { data } = useMyStudentsData(grade_level, section)
    console.log(data)
    
    return (
        <div>MyStudentsTable</div>
    )
}
