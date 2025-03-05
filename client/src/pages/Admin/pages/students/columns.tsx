import { ColumnDef } from '@tanstack/react-table'
import { StudentData } from '@/types/student.types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<StudentData>[] = [
    {
        accessorKey: "lastname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "firstname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "sex",
        header: "Sex",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "contact",
        header: "Contact",
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
    },
    {
        accessorKey: "section",
        header: "Section",
    },
]