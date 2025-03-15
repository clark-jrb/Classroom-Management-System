import { TTask } from "@/types/task.types"
import { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns = (
  openEditDialog: (task: TTask) => void,
  openDeleteDialog: (task: TTask) => void
): ColumnDef<TTask>[] => [
  {
    accessorKey: "task_no",
    header: "No.",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "total_items",
    header: "Total items",
  },
  {
    accessorKey: "grade",
    header: "Grade level",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "quarter",
    header: "Quarter",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <Button 
            variant={'ghost'}
            onClick={(e) => {
              e.stopPropagation()
              openEditDialog(row.original)
            }}
            className="hover:bg-gray-200 hover:text-gray-500"
          >
            <Pen className="ms-auto"/>
          </Button>
          <Button 
            variant={'ghost'}
            onClick={(e) => {
              e.stopPropagation()
              openDeleteDialog(row.original)
            }}
            className="hover:bg-red-200 hover:text-red-500"
          >
            <Trash2 className="ms-auto"/>
          </Button>
        </div>
      )
    }
  }
]
