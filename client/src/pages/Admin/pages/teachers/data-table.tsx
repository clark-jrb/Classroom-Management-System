import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
    getPaginationRowModel,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { grade_levels_options, sections_options, subjects_options } from "@/constants/options"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        initialState: {
            pagination: {
                pageSize: 8
            }
        }
        
    })

    return (
        <div>
            <div className="flex gap-4 items-center py-4">
                {/* Filter by last name */}
                <Input
                    placeholder="LAST NAME"
                    value={(table.getColumn("lastname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("lastname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {/* Filter by first name */}
                <Input
                    placeholder="FIRST NAME"
                    value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("firstname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {/* Filter by grade level assigned */}
                <Select 
                    onValueChange={
                        (value) => {
                            value !== 'all' 
                                ? table.getColumn("grade_assigned")?.setFilterValue(value)
                                : table.getColumn("grade_assigned")?.setFilterValue("")
                        }
                    }
                    defaultValue={(table.getColumn("grade_assigned")?.getFilterValue() as string) ?? ""}
                >
                    <SelectTrigger className="w-[30rem]">
                        <SelectValue placeholder="Grade level" />
                    </SelectTrigger>
                    <SelectContent>
                        {grade_levels_options.map(({ name, value }, index) => (
                            <SelectItem key={index} value={value}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* Filter by sections */}
                <Select 
                    onValueChange={
                        (value) => {
                            value !== 'all' 
                                ? table.getColumn("section_handled")?.setFilterValue(value)
                                : table.getColumn("section_handled")?.setFilterValue("")
                        }
                    }
                    defaultValue={(table.getColumn("section_handled")?.getFilterValue() as string) ?? ""}
                >
                    <SelectTrigger className="w-[30rem]">
                        <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                        {sections_options.map(({ name, value }, index) => (
                            <SelectItem key={index} value={value}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* Filter by subjects */}
                <Select 
                    onValueChange={
                        (value) => {
                            value !== 'all' 
                                ? table.getColumn("subjects")?.setFilterValue(value)
                                : table.getColumn("subjects")?.setFilterValue("")
                        }
                    }
                    defaultValue={(table.getColumn("subjects")?.getFilterValue() as string) ?? ""}
                >
                    <SelectTrigger className="w-[30rem]">
                        <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects_options.map(({ name, value }, index) => (
                            <SelectItem key={index} value={value}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* Show/Remove Columns */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Show/hide columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* Previous page button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                {/* Show page */}
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                {/* Next page button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
