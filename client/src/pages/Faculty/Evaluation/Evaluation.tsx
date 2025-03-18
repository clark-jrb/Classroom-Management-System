import { BookOpenCheck } from "lucide-react"
import { Link } from "react-router-dom"

export const Evaluation = () => {

    return (
        <div className="space-y-4">
            <Link to={`/evaluation/qa`} className="block w-[20rem]">
                <div className="border p-4 rounded-md flex items-center hover:shadow-md transition duration-200">
                    <span className="text-navy text-lg">
                        Students Quarterly Average
                    </span>
                    <div className="text-gray-500 ms-auto">
                        <BookOpenCheck strokeWidth={1}/>
                    </div>
                </div>
            </Link>
            <Link to={`/evaluation/ga`} className="block w-[20rem]">
                <div className="border p-4 rounded-md flex items-center hover:shadow-md transition duration-200">
                    <span className="text-navy text-lg">
                        Students General Average
                    </span>
                    <div className="text-gray-500 ms-auto">
                        <BookOpenCheck strokeWidth={1}/>
                    </div>
                </div>
            </Link>
        </div>
    )
}
