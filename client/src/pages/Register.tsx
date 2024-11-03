import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useEffect } from "react"
import { useAuthentication } from "@/hooks/useAuthentication"
import { registerSchema } from "@/schemas/authSchemas"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useNavigate } from "react-router-dom"

const subjectsList = [
    { name: 'Math', checked: false },
    { name: 'English', checked: false }
]

export const Register = () => {
    const { registerUser }  = useAuthentication()
    const navigate = useNavigate()
    const { role } = useAuthStore()

    useEffect(() => {
        if (!role) {
            console.log('role is empty')
            navigate('/home')
        }
    }, [role]);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            email: "",
            password: "",
            role: role,
            subjects: 
                role === 'faculty' ? 
                    subjectsList.map((subject) => ({ ...subject }))
                    : undefined,
            gradeLevel: 
                role === "student" ? 0 : undefined,
            homeroom: 
                role === "faculty" ? false : undefined,
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        registerUser.mutate(values)
        form.reset()
        console.log(values)
    }

    const onError = (errors: any) => {
        console.log("Form errors:", errors)
    }

    // useEffect(() => {
    //     if (role) {
    //         form.unregister('subjects')
    //         form.unregister('gradeLevel')
    //         console.log('role changed')
    //     }
    // }, [role]);

    return (
        <div className="register-page">
            <div className="border rounded-md p-6">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name:</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="your first name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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
                        {role === 'student' && (
                            <FormField
                                control={form.control}
                                name="gradeLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grade Level:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="your grade level" 
                                                min={1}
                                                max={6}
                                                onChange={(e) => field.onChange(Number(e.target.value))} 
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        )}

                        {role === 'faculty' && (
                            <div>
                            {subjectsList.map(({ name }, index) => (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`subjects.${index}.checked`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{name}</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <input
                                                type="hidden"
                                                value={name}
                                                {...form.register(`subjects.${index}.name`)}
                                            />
                                        </FormItem>
                                    )}
                                    />
                                ))}
                                {form.formState.errors.subjects && (
                                    <p className="text-red-600">
                                        {form.formState.errors.subjects?.root?.message}
                                    </p>
                                )}
                            </div>
                        )}
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
