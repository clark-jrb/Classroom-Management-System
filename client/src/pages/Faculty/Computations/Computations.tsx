import { teacherInfo } from "@/hooks/useTeacherQueries"
import { Sections } from "./pages/Sections"

export const Computations = () => {
    const { section_handled } = teacherInfo()

    return (
        <div>
            Computations
            {section_handled.map((data: string, index: number) => (
                <Sections key={index} section_assigned={data}/>
            ))}
        </div>
    )
}
