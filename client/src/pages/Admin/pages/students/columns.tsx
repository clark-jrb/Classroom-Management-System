import { ColumnDef } from '@tanstack/react-table'
import { StudentData } from '@/types/student.types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from 'react-router-dom'
import { useState } from 'react'

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
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false)
            
            return (
                <>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>
                                            Delete Account
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="w-[20rem]">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure?
                                </DialogTitle>
                                <DialogDescription className="py-4">
                                    This action cannot be undone once submitted.
                                </DialogDescription>
                                <div className="ms-auto">
                                    <div className="flex space-x-2">
                                        <DialogClose asChild>
                                            <Button type="button" variant={'destructive'}>Cancel</Button>
                                        </DialogClose>
                                        {/* <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit, onError)}> */}
                                                <Button type="submit">
                                                    Yes, submit
                                                </Button>
                                            {/* </form>
                                        </Form> */}
                                    </div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>
            )
        },
    },
]