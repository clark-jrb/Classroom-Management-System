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
import axios from 'axios'
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const formSchema = z.object({
    firstname: z.string().min(1, { message: 'please fill the empty field' }),
    email: z.string().min(1, { message: 'please fill the empty field' }),
    password: z.string().min(8, { message: 'password should be 8 characters' }),
    role: z.string().min(1, { message: 'role is required' }).optional(),
    gradeLevel: z.number().min(1, { message: 'Grade level must be at least 1' }).optional(),
    subjects: z.array(
        z.object({
            name: z.string().min(1, { message: 'Subject name is required' }),
            checked: z.boolean().default(false).optional(), // Boolean field for checked status
        })
    ).min(1, { message: 'At least one subject must be selected' }).optional(),
    homeroom: z.boolean().default(false).optional()
})

const subjectsList = [
    { name: 'Math', checked: false },
    { name: 'English', checked: false }
]

export const Register = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            email: "",
            password: "",
            role: "",
            // gradeLevel: 0,
            // subjects: subjectsList
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // mutation.mutate(values)
        console.log(values)
    }

    const onError = (errors: any) => {
        console.log("Form errors:", errors);
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
                            (subjectsList.map(({ name }, index) => (
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
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            )))
                        )}

                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
