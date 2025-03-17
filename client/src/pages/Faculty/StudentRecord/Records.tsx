import { Link } from "react-router-dom"
import { FileText } from "lucide-react"

export const Records = () => {
    const recordsLinks = [
        { name: 'Recitations', path_name: 'recitation'},
        { name: 'Activities', path_name: 'activity'},
        { name: 'Quizzes', path_name: 'quiz' },
        { name: 'Projects', path_name: 'project'},
        { name: 'Summatives', path_name: 'summative'},
        { name: 'Exams', path_name: 'exam' },
    ]

    return (
        <div className="grid grid-cols-6 gap-4">
            {recordsLinks.map(({name, path_name}, index) => (
                <Link to={`${path_name}`} key={index}>
                    <div className="flex border p-4 rounded text-lg text-navy hover:shadow-md transition duration-200">
                        {name}
                        <FileText strokeWidth={1} className="ms-auto"/>
                    </div>
                </Link>
            ))}
        </div>
    )
}
