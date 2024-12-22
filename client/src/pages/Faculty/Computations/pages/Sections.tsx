import { Link } from "react-router-dom"
import { SubjectTypes } from "@/types/types"

export const Sections = ({ section_assigned, subject_handled }: {
    section_assigned: string
    subject_handled: SubjectTypes
}) => {

    return (
        <Link to={`/computations/view/${section_assigned}/${subject_handled}`} className="block">
            <div className="border p-8 rounded-md">
                {section_assigned} {subject_handled}
            </div>
        </Link>
    )
}
