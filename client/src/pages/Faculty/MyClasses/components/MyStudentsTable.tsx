import { useMyStudentsData } from "@/hooks/useTeacherQuery"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getGradeName } from "@/helpers/get-quarter"
import { toCamelCase } from "@/helpers/camel-case"
import { GradeLevels } from "@/types/global.types"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const MyStudentsTable = ({ section, grade_level, setView }: {
    section: string
    grade_level: string
    setView: (state: boolean) => void
}) => {
    const { data } = useMyStudentsData(grade_level, section)
    // console.log(data)

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-end gap-2">
                <Button 
                    type={'button'} 
                    variant={'ghost'} 
                    onClick={() => setView(false)}
                >
                    <ArrowLeft/>
                </Button>
                <div className="text-navy flex gap-2">
                    <span className="text-2xl">
                        {getGradeName(grade_level as GradeLevels)}
                    </span>
                    <div className="border-r"></div>
                    <span className="text-lg">
                        {toCamelCase(section)}
                    </span>
                </div>
            </div>
            <DataTable data={data} columns={columns}/>
        </div>
    )
}
