import { Link } from "react-router-dom"
import { SubjectTypes } from "@/types/global.types"
import { toCamelCase } from "@/helpers/camel-case"
import { NotebookPen, NotebookText } from "lucide-react"

export const Sections = ({ section_assigned, subject_handled, route }: {
    section_assigned: string
    subject_handled: SubjectTypes
    route: string
}) => {

    return (
        <Link to={`/${route}/view/${section_assigned}/${subject_handled}`} className="block w-[15rem]">
            <div className="border p-4 rounded-md flex hover:shadow-md transition duration-200">
                <div>
                    <div className="text-light_navy">
                        {toCamelCase(section_assigned)}
                    </div>
                    <div className="text-lg text-navy">
                        {toCamelCase(subject_handled)}
                    </div>
                </div>
                <div className="ms-auto text-gray-500">
                    {route === 'computations' && 
                        <NotebookPen strokeWidth={1}/>
                    }
                    {route === 'grades' && 
                        <NotebookText strokeWidth={1}/>
                    }
                </div>
            </div>
        </Link>
    )
}
