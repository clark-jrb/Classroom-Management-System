import { teacherClassInfo } from "@/hooks/useTeacherQueries"
import { Sections } from "../../../components/Sections"
import { SubjectTypes } from "@/types/global.types"

export const Computations = () => {
    const { section_handled, subjects } = teacherClassInfo()

    return (
        <div >
            Computations
            <div className="space-y-4">
                {section_handled.map((section: string, index: number) => (
                    <div key={index} className="space-y-4">
                        {subjects.map((subject: SubjectTypes, index: number) => (
                            <Sections 
                                key={index} 
                                section_assigned={section} 
                                subject_handled={subject}
                                route="computations"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
