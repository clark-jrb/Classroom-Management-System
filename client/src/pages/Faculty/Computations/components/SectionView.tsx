import { useParams } from "react-router-dom"
import { Procedures } from "./Procedures"
import { SubjectTypes } from "@/types/types"
import { teacherInfo } from "@/hooks/useTeacherQueries"

export const SectionView = () => {
    const { section, subject } = useParams<{ section: string, subject: SubjectTypes }>()
    const { section_handled, subjects } = teacherInfo()

    if (!section || !subject) {
        return <div>Error: Missing required route parameters</div>;
    }

    if (!subjects.includes(subject as SubjectTypes) || !section_handled.includes(section)) {
        return <div>Error: Invalid subject or section parameter</div>;
    }

    return (
        <div>
            <Procedures subject_handled={subject} section_assigned={section}/>
        </div>
    )
}
