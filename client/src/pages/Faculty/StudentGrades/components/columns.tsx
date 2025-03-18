import { StudentSGWithProfile } from "@/types/computation.types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<StudentSGWithProfile[number]>[] = [
    {
        accessorKey: "sid.lastname",
        header: "Last Name",
    },
    {
        accessorKey: "sid.firstname",
        header: "First Name",
    },
    {
        accessorKey: "subj_grade",
        header: "Subject Grade",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.subj_grade.toFixed(0)}
                </div>
            )
        }
    },
    {
        header: "Remarks",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.subj_grade >= 75 
                        ? 'PASSED' 
                        : 'FAILED'
                    }
                </div>
            )
        }
    },
]
