import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const RecordsHome = () => {

    const recordsLinks = [
        { name: 'Recitations', path_name: 'recitation'},
        { name: 'Activities', path_name: 'activity'},
        { name: 'Quizzes', path_name: 'quiz' },
        { name: 'Projects', path_name: 'project'},
        { name: 'Summatives', path_name: 'summative'},
        { name: 'Exams', path_name: 'exam' },
    ]

    return (
        <div>
            {recordsLinks.map(({name, path_name}, index) => (
                <Link to={`${path_name}`} key={index}>
                    <Button className="me-2" variant={'outline'}>
                        {name}
                    </Button>
                </Link>
            ))}
        </div>
    )
}
