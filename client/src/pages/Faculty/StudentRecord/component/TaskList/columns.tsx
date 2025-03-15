import { TTask } from "@/types/task.types"
import { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TaskDelete } from "../TaskDelete"
import { TaskUpdate } from "../TaskUpdate"

export const columns: ColumnDef<TTask>[] = [
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
      const [openDelete, setOpenDelete] = useState(false)
      const [openUpdate, setOpenUpdate] = useState(false)

      const updateData = {
        subject: row.original.subject,
        total_items: row.original.total_items,
        task_no: row.original.task_no,
      }

      return (
        <div>
          <Button 
            variant={'ghost'}
            onClick={(e) => {
              e.stopPropagation()
              setOpenUpdate(true)
            }}
            className="hover:bg-gray-200 hover:text-gray-500"
          >
            <Pen className="ms-auto"/>
          </Button>
          <Button 
            variant={'ghost'}
            onClick={(e) => {
              e.stopPropagation()
              setOpenDelete(true)
            }}
            className="hover:bg-red-200 hover:text-red-500"
          >
            <Trash2 className="ms-auto"/>
          </Button>

          <TaskDelete
            task_id={row.original._id}
            openDialog={openDelete}
            setOpenDialog={setOpenDelete}
          />
          <TaskUpdate
            task_id={row.original._id}
            task_data={updateData}
            openDialog={openUpdate}
            setOpenDialog={setOpenUpdate}
          />
        </div>
      )
    }
  }
]
