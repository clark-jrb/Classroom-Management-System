import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useAuthentication } from "@/hooks/useAuthentication"
import { useAuthStore } from "@/stores/auth/authSlice"
import { loginSchema } from "@/schemas/authSchemas"

export const Login = () => {
    const { loginUser } = useAuthentication()
    const { role } = useAuthStore()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            role: role
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        loginUser.mutate(values)
        console.log(values)
    }

    return (
        <div className="login-page">
            <div className="border rounded-md p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="your email" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password:</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="your password" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loginUser.isPending}>
                            {loginUser.isPending ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
