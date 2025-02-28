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
import { useAuthQuery } from "@/hooks/useAuthQuery"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userAccountSchema } from "@/schemas/user.schema"

export const Login = () => {
    const { loginUser } = useAuthQuery()
    const { role } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!role) {
            console.log('role is empty')
            navigate('/home')
        }
    }, [role]);

    const form = useForm<z.infer<typeof userAccountSchema>>({
        resolver: zodResolver(userAccountSchema),
        defaultValues: {
            email: "",
            password: "",
            role: role
        },
    })

    function onSubmit(values: z.infer<typeof userAccountSchema>) {
        loginUser.mutateAsync(values)
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
                                        <Input type="email" placeholder="your email" {...field} disabled={loginUser.isPending}/>
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
                                        <Input type="password" placeholder="your password" {...field} disabled={loginUser.isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                        <Button type="submit" disabled={loginUser.isPending}>
                            {loginUser.isPending ? 'Loading...' : 'Login'}
                        </Button>
                    </form>
                    <Button onClick={() => navigate('/home')}>
                        Back
                    </Button>
                </Form>
            </div>
        </div>
    )
}
