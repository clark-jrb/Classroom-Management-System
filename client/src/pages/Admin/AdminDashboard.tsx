import { Container } from "@/components/Container"
import { AdminLayout } from "./AdminLayout"
import { useCurrentQuarter } from "@/hooks/useAdminQuery"
import { CurrentQuarter } from "@/types/global.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { currentQuarterSchema } from "@/schemas/admin.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { getQuarterName } from "@/helpers/get-quarter"

export const AdminDashboard = () => {
    const { data, isLoading, isError, error } = useCurrentQuarter()
    
    if (isLoading) {
        console.log('loading...')
    }

    if (data) {
        console.log(data)
    }

    if (isError) {
        console.log(error.message)
    }

    return (
        <AdminLayout>
            <Container>
                This is admin dashboard
                {data && <CurrentQuarterDisplay data={data}/>}
            </Container>
        </AdminLayout>
    )
}

const CurrentQuarterDisplay = ({ data }: {
    data: CurrentQuarter
}) => {
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

    function onSubmit(values: CurrentQuarter) {
        console.log(values)
    }

    function onError(error: any) {
        console.log('Error: ', error)
    }

    return (
        <div>
            <div>Current quarter: {getQuarterName(data.current_quarter)}</div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <FormField
                            control={form.control}
                            name="current_quarter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Change quarter:</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
