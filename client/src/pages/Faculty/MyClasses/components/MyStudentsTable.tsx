import { useMyStudentsData } from "@/hooks/useTeacherQuery"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UsersRound } from "lucide-react"
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
                <div className="text-navy flex gap-2 items-end">
                    <span className="text-2xl">
                        {getGradeName(grade_level as GradeLevels)}
                    </span>
                    <div className="text-gray-500 text-2xl">/</div>
                    <span className="text-lg text-light_navy">
                        {toCamelCase(section)}
                    </span>
                </div>
                <div className="text-lg flex gap-2 text-navy ms-6">
                    <UsersRound strokeWidth={1}/>
                    {data.length}
                </div>
            </div>
            <DataTable data={data} columns={columns}/>
        </div>
    )
}
