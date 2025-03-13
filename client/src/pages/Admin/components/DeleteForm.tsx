import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useAdminMutations } from "@/hooks/useAdminQuery"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { Roles } from "@/types/global.types"


export const DeleteForm = ({ id, setOpenDialog, role }: {
    role: Roles
    id: string
    setOpenDialog: (state: boolean) => void
}) => {
    const queryClient = useQueryClient()
    const { deleteUserMutation } = useAdminMutations()

    const formSchema = z.object({
        id: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: id
        }
    })

    function getQueryKey(role: Roles){
        const selected = {
            student: 'students',
            faculty: 'teachers'
        }

        return selected[role as keyof typeof selected]
    }
    
    function onSubmit() {
        const user_id = form.getValues('id')

        deleteUserMutation.mutateAsync({ id: user_id, role }, {
            onSuccess: (data) => {
                const { message } = data
                queryClient.invalidateQueries({ queryKey: [`${getQueryKey(role)}`] })
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
                <Button 
                    variant={'navy'}
                    type="submit"
                >
                    Yes, delete
                </Button>
            </form>
        </Form>
    )
}
