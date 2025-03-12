import { Container } from "@/components/Container"
import { AdminLayout } from "./AdminLayout"
import { useAdminMutations, useCurrentQuarter, useStudentsData, useTeachersData } from "@/hooks/useAdminQuery"
import { CurrentQuarter } from "@/types/global.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { currentQuarterSchema } from "@/schemas/admin.schema"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { getQuarterName } from "@/helpers/get-quarter"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { isQuarterChanged } from "@/helpers/changed-fields"
import { CalendarRange, Check, LoaderCircle, Users } from "lucide-react"
import { DataCountCard } from "./components/DataCountCard"

export const AdminDashboard = () => {
    const { data: current_quarter, isLoading, isError, error } = useCurrentQuarter()
    const teachers = useTeachersData()
    const students = useStudentsData()

    return (
        <AdminLayout>
            <Container>
                <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">Welcome, Admin!</div>
                <div className="py-4 flex gap-4">
                    {isLoading && 
                        <div className="w-[17rem] h-[8rem] border flex justify-center items-center">
                            <LoaderCircle className="animate-spin text-red" color="gray"/>
                        </div>
                    }
                    {isError && 
                        <div>There is an error: {error.message}</div>
                    }
                    {current_quarter && 
                        <CurrentQuarterDisplay data={current_quarter}/>
                    }
                    <DataCountCard
                        dataQuery={teachers}
                        label="Registered Teachers:"
                        icon={<Users strokeWidth={1} className="ms-auto"/>}
                    />
                    <DataCountCard
                        dataQuery={students}
                        label="Registered Students:"
                        icon={<Users strokeWidth={1} className="ms-auto"/>}
                    />
                </div>
            </Container>
        </AdminLayout>
    )
}

const CurrentQuarterDisplay = ({ data }: {
    data: CurrentQuarter
}) => {
    const quaryClient = useQueryClient()
    const { quarterMutation } = useAdminMutations()
    
    const quarters = [
        { name: 'Quarter 1', value: 'q1' },
        { name: 'Quarter 2', value: 'q2' },
        { name: 'Quarter 3', value: 'q3' },
        { name: 'Quarter 4', value: 'q4' }
    ]

    const form = useForm<CurrentQuarter>({
        resolver: zodResolver(currentQuarterSchema),
        defaultValues: data
    })

    function onSubmit(value: CurrentQuarter) {
        quarterMutation.mutateAsync(
            {
                id: data._id,
                value
            }, 
            {
                onSuccess: (data) => {
                    const { message } = data
                    console.log(message)
                    quaryClient.invalidateQueries({ queryKey: ['current_quarter'] })
                    toast.success(message)
                },
                onError: (error) => {
                    console.log(error)
                }
            }
        )
    }

    function onError(error: any) {
        console.log('Error: ', error)
    }

    const quarterChanged = isQuarterChanged(data.current_quarter, form.watch('current_quarter'))

    return (
        <div className="w-[17rem] h-[9rem] rounded-xl border p-4 h-full flex flex-col justify-between">
            <div className="w-inherit">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex justify-end gap-2">
                        <CalendarRange strokeWidth={1} className="me-auto"/>
                        {quarterChanged && 
                            <Button type="submit" disabled={quarterMutation.isPending} variant={'secondary'}>
                                {quarterMutation.isPending ? <LoaderCircle className="animate-spin"/> : <Check  />}
                            </Button>
                        }
                        <FormField
                            control={form.control}
                            name="current_quarter"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Change quarter</FormLabel> */}
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="select quarter" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {quarters.map(({ name, value }, index) => (
                                                    <SelectItem key={index} value={value}>{name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <div className="w-inherit">
                <div className="text-gray-500 text-sm">
                    Current quarter:&nbsp;
                </div>
                <div className="text-2xl text-navy">
                    {getQuarterName(data.current_quarter)}
                </div>
            </div>
        </div>
    )
}
