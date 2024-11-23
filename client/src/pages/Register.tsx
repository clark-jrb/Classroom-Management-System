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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RegisterStudent } from "./Register-student"
import { RegisterTeacher } from "./Register-teacher"

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
            subjects: [],
            gradeLevel: 0,
            homeroom: false,
            firstname: "",
            middlename: "",
            lastname: "",
            sex: "",
            contact: "",
            section: ""
        },
    })

    const selectedSubjects = form.watch("subjects");

    const handleCheckboxChange = (value: string, checked: boolean): void => {
        const currentSubjects = selectedSubjects || [];
        if (checked) {
          // Add value if checked
            form.setValue("subjects", [...currentSubjects, value]);
        } else {
          // Remove value if unchecked
            form.setValue(
                "subjects",
                currentSubjects.filter((item) => item !== value)
            );
        }
    };

    useEffect(() => {
        console.log(selectedSubjects)
    }, [selectedSubjects]);

    function onSubmit(values: z.infer<typeof registerSchema>) {
        registerUser.mutate(values)
        form.reset()
        console.log(values)
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    const grade_level = form.watch("gradeLevel") || 0

    useEffect(() => {
        form.resetField("section")
    }, [grade_level]);

    function handleNextForm() {
        if (form.watch("email") && form.watch("password")) setNextForm(true)
        if (role === 'student') { form.unregister('subjects'); form.unregister('homeroom') }
        if (role === 'faculty') { form.unregister('gradeLevel'); form.unregister('section') }
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
                            <div className="flex gap-5">
                                <div className="w-1/2">
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
                                </div>
                            
                                <div className="w-1/2">
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
                                    {/* Contact */}
                                        <FormField
                                            control={form.control}
                                            name="contact"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Number:</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="your contact number" {...field} disabled={registerUser.isPending}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    {/* For Students */}
                                        {role === 'student' && (
                                            <RegisterStudent form={form} watch_grade={grade_level}/>
                                        )}
                                    {/* For Faculty */}
                                        {role === 'faculty' && (
                                            <RegisterTeacher form={form} handleCheckbox={handleCheckboxChange}/>
                                        )}
                                </div>
                            </div>
                            {/* BUTTONS */}
                            <div className="float-end">
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
