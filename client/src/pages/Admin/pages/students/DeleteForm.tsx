import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useAdminMutations } from "@/hooks/useAdminQuery"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"


export const DeleteForm = ({ sid, setOpenDialog }: {
    sid: string
    setOpenDialog: (state: boolean) => void
}) => {
    const queryClient = useQueryClient()
    const { deleteStudentMutation } = useAdminMutations()

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
        const sid = form.getValues('sid')

        deleteStudentMutation.mutateAsync(sid, {
            onSuccess: (data) => {
                const { message } = data
                queryClient.invalidateQueries({ queryKey: ['students'] })
                toast.success(message)
                setOpenDialog(false)
            },
            onError: (error) => {
                toast.error(error.message)
                setOpenDialog(false)
            }
        })
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
