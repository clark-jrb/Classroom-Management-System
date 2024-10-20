import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import axios from 'axios'
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    firstname: z.string().min(1, { message: 'please fill the empty field' }),
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' }),
    gradeLevel: z.number().min(1, { message: 'please fill the empty field' }),
    subjects: z.string().min(1, { message: 'please fill the empty field' }),
    homeroom: z.number().min(1, { message: 'please fill the empty field' })
})


export const Register = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            email: "",
            password: "",
            role: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // mutation.mutate(values)
        console.log(values)
    }

    const role = form.watch('role')

    console.log(role)

    return (
        <div className="register-page">
            <div className="border rounded-md p-6">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role:</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="faculty">Faculty</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {role === 'student' && (
                            <div>
                                this is student
                            </div>
                        )}

                        {role === 'faculty' && (
                            <div>
                                this is faculty
                            </div>
                        )}

                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
