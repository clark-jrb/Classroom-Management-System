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
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useEffect } from "react"
import { useAuthentication } from "@/hooks/useAuthentication"
import { registerSchema } from "@/schemas/authSchemas"

const subjectsList = [
    { name: 'Math', checked: false },
    { name: 'English', checked: false }
]

export const Register = () => {
    const { registerUser }  = useAuthentication()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            email: "",
            password: "",
            role: "",
            subjects: subjectsList.map((subject) => ({ ...subject, checked: false })),
            gradeLevel: 0,
            homeroom: false
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        registerUser.mutate(values)
        form.reset()
        console.log(values)
    }

    const onError = (errors: any) => {
        console.log("Form errors:", errors);
        console.log("Form state errors:", form.formState.errors.subjects?.message)
    }

    const role = form.watch('role')

    useEffect(() => {
        if (role) {
            form.unregister('subjects')
            form.unregister('gradeLevel')
            console.log('role changed')
        }
    }, [role]);

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
                                <FormMessage id="subjects"/>
                                {form.formState.errors.subjects && (
                                    <p className="text-red-600">
                                        {form.formState.errors.subjects?.message}
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
