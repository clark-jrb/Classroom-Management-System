import { teacherInfo } from "@/hooks/useTeacherQueries"
import { Sections } from "../../../components/Sections"
import { SubjectTypes } from "@/types/types"

export const Grades = () => {
    const { section_handled, subjects } = teacherInfo()

    return (
        <div>
            Student Grades
            <div className="space-y-4">
                {section_handled.map((section: string, index: number) => (
                    <div key={index} className="space-y-4">
                        {subjects.map((subject: SubjectTypes, index: number) => (
                            <Sections 
                                key={index} 
                                section_assigned={section} 
                                subject_handled={subject}
                                route="grades"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
