import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
// import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useAuthentication } from "@/hooks/useAuthentication"
import { registerSchema } from "@/schemas/authSchemas"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const subjectsList = [
    { name: 'Math', checked: false },
    { name: 'English', checked: false },
    { name: 'Hekasi', checked: false },
    { name: 'Science', checked: false },
]

export const Register = () => {
    const { registerUser }  = useAuthentication()
    const navigate = useNavigate()
    const { role } = useAuthStore()
    const [nextForm, setNextForm] = useState(false)

    useEffect(() => {
        if (!role) {
            console.log('role is empty')
            navigate('/home')
        }
    }, [role]);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            role: role,
            subjects: subjectsList.map((subject) => ({ ...subject })),
            gradeLevel: 0,
            homeroom: false,
            firstname: "",
            middlename: "",
            lastname: "",
            sex: ""
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        // registerUser.mutate(values)
        // form.reset()
        console.log(values)
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    function handleNextForm() {
        if (form.watch("email") && form.watch("password")) setNextForm(true)
        if (role === 'student') { form.unregister('subjects'); form.unregister('homeroom') }
        if (role === 'faculty') { form.unregister('gradeLevel') }
    }

    return (
        <div className="register-page">
            <div className="border rounded-md p-6">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
                        {!nextForm ?
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email:</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="your email" {...field} disabled={registerUser.isPending}/>
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
                                                <Input type="password" placeholder="your password" {...field} disabled={registerUser.isPending}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button onClick={handleNextForm}>
                                    Next
                                </Button>
                            </>
                            :
                            <>
                            <div>
                            {/* First Name  */}
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your first name" {...field} disabled={registerUser.isPending}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            {/* Middle Name */}
                                <FormField
                                    control={form.control}
                                    name="middlename"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle Name:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your middle name" {...field} disabled={registerUser.isPending}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            {/* Last Name */}
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name:</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your last name" {...field} disabled={registerUser.isPending}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            {/* Birth Date */}
                                <FormField
                                    name="birth_date"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Birth Date:</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    startYear={1950}
                                                    endYear={2024}
                                                    value={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            {/* Sex */}
                            <FormField
                                control={form.control}
                                name="sex"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sex:</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="your sex" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* For Students */}
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
                                                        disabled={registerUser.isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                )}
                            {/* For Faculty */}
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
                                                                disabled={registerUser.isPending}
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
                                
                                <Button onClick={() => setNextForm(false)}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={registerUser.isPending}>
                                    {registerUser.isPending ? 'Processing...' : 'Register'}
                                </Button>
                            </div>
                            </>
                        }
                    </form>
                    {!nextForm && (
                        <Button onClick={() => navigate('/home')}>Back</Button>
                    )}
                </Form>
            </div>
        </div>
    )
}
