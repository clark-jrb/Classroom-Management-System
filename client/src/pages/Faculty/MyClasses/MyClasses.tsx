import { teacherClassInfo } from "@/hooks/useTeacherQueries"

export const MyClasses = () => {
    const { section_handled, grade_assigned } = teacherClassInfo()

    return (
        <div>
            My Classes
            <div className="space-y-4">
                {section_handled.map((section, index) => (
                    <div key={index}>
                        {grade_assigned}{section}
                    </div>
                ))}
            </div>
        </div>
    )
}