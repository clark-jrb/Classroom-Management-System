import { Container } from "@/components/Container"
import { AdminLayout } from "./AdminLayout"
import { useAdminMutations, useCurrentQuarter } from "@/hooks/useAdminQuery"
import { CurrentQuarter } from "@/types/global.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { currentQuarterSchema } from "@/schemas/admin.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { getQuarterName } from "@/helpers/get-quarter"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { isQuarterChanged } from "@/helpers/changed-fields"

export const AdminDashboard = () => {
    const { data, isLoading, isError, error } = useCurrentQuarter()
    
    if (isLoading) {
        console.log('loading...')
    }

    if (isError) {
        console.log(error.message)
    }

    return (
        <AdminLayout>
            <Container>
                This is admin dashboard
                <div>
                    {isLoading && <div>Loading...</div>}
                    {data && <CurrentQuarterDisplay data={data}/>}
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
        <div className="space-y-4">
            <div>
                Current quarter:&nbsp;
                <span className="text-xl">
                    {getQuarterName(data.current_quarter)}
                </span>
            </div>
            <div className="w-fit">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <FormField
                            control={form.control}
                            name="current_quarter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Change quarter</FormLabel>
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
                        {quarterChanged && 
                            <Button type="submit" disabled={quarterMutation.isPending}>
                                {quarterMutation.isPending ? 'Pending...' : 'Submit'}
                            </Button>
                        }
                    </form>
                </Form>
            </div>
        </div>
    )
}
