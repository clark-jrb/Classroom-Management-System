import { teacherInfo } from "@/hooks/useTeacherQueries"
import { Sections } from "./pages/Sections"
import { SubjectTypes } from "@/types/types"

export const Computations = () => {
    const { section_handled, subjects } = teacherInfo()

    return (
        <div>
            Computations
            {section_handled.map((section: string, index: number) => (
                <div key={index} className="space-y-4">
                    {subjects.map((subject: SubjectTypes, index: number) => (
                        <Sections key={index} section_assigned={section} subject_handled={subject}/>
                    ))}
                </div>
            ))}
        </div>
    )
}
