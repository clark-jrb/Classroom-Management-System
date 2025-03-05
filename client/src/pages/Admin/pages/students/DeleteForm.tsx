import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"


export const DeleteForm = ({ sid }: {
    sid: string
}) => {
    const formSchema = z.object({
        sid: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sid: sid
        }
    })
    
    function onSubmit() {
        console.log(form.watch('sid'))
    }

    function onError(error: any) {
        console.log(error)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <Button type="submit">
                    Yes, delete
                </Button>
            </form>
        </Form>
    )
}
