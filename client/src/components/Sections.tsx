import { Link } from "react-router-dom"
import { SubjectTypes } from "@/types/GlobalTypes"

export const Sections = ({ section_assigned, subject_handled, route }: {
    section_assigned: string
    subject_handled: SubjectTypes
    route: string
}) => {

    return (
        <Link to={`/${route}/view/${section_assigned}/${subject_handled}`} className="block">
            <div className="border p-8 rounded-md">
                {section_assigned} {subject_handled}
            </div>
        </Link>
    )
}
