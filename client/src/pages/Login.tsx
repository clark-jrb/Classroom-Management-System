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
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { AuthContainer } from "@/components/AuthContainer"

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
            <AuthContainer>
                <div className="text-2xl">Login to your account</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="py-6"
                                            type="email" 
                                            placeholder="your email" 
                                            {...field} 
                                            disabled={loginUser.isPending}
                                            />
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
                                        <Input 
                                            className="py-6"
                                            type="password" 
                                            placeholder="your password" 
                                            {...field} 
                                            disabled={loginUser.isPending}
                                            />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        
                        <Button 
                            className="w-full py-6 text-md"
                            type="submit" 
                            variant={"navy"}
                            disabled={loginUser.isPending}
                        >
                            {loginUser.isPending 
                                ? <><LoaderCircle className="animate-spin"/>Processing</>
                                : 'Login'
                            }
                        </Button>
                    </form>
                    <div className="border-b"></div>
                    <div>
                        <Button 
                            variant={'ghost'}
                            onClick={() => navigate('/home')}
                            >
                            <ArrowLeft/>Go Back
                        </Button>
                    </div>
                </Form>
            </AuthContainer>
        </div>
    )
}
