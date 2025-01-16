import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuthentication } from "@/hooks/useAuthQueries"
import { registerAccountSchema, registerInformationSchema, registerClassesSchema } from "@/schemas/authSchemas"
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
import { RegisterStudent } from "./student"
import { RegisterTeacher } from "./teacher"
import { unregisterFields } from "@/helpers/unregister-fields"

export const Register = () => {
    const { registerUser }  = useAuthentication()
    const navigate = useNavigate()
    const { role } = useAuthStore()
    const [nextForm, setNextForm] = useState(1)
    const [form1Values, setform1Values] = useState({})
    const [form2Values, setform2Values] = useState({})

    useEffect(() => {
        if (!role) {
            console.log('role is empty')
            navigate('/home')
        }
        unregisterFields({form: form3, role})
    }, [role]);

    const form1 = useForm<z.infer<typeof registerAccountSchema>>({
        resolver: zodResolver(registerAccountSchema),
        defaultValues: {
            email: "",
            password: "",
            role: role,
        },
        mode: "onBlur"
    })

    const form2 = useForm<z.infer<typeof registerInformationSchema>>({
        resolver: zodResolver(registerInformationSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            sex: "",
            contact: "",
        },
        mode: "onBlur"
    })

    const form3 = useForm<z.infer<typeof registerClassesSchema>>({
        resolver: zodResolver(registerClassesSchema),
        defaultValues: {
            // for student
            gradeLevel: "",
            section: "",
            // for teacher
            teacher_role: "",
            grade_assigned: "",
            section_handled: [],
            subjects: [],
        },
        mode: "onBlur"
    })

    function onSubmitForm1(values: z.infer<typeof registerAccountSchema>) {
        setform1Values(values)
        setNextForm(2)
    }

    function onSubmitForm2(values: z.infer<typeof registerInformationSchema>) {
        setform2Values(values)
        setNextForm(3)
    }

    function onSubmitForm3(values: z.infer<typeof registerClassesSchema>) {
        const registerData = {
            account: form1Values,
            profile: form2Values,
            classes: values
        }
        registerUser.mutate(registerData)
        console.log(registerData)
    }

    function onErrorForm(errors: any) { console.log("Form errors:", errors) }

    return (
        <div className="register-page">
            <div className="border rounded-md p-6">
                {nextForm === 1 && (
                    <Form {...form1}>
                        <form onSubmit={form1.handleSubmit(onSubmitForm1, onErrorForm)} className="space-y-6">
                            <FormField
                                control={form1.control}
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
                                control={form1.control}
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
                            <Button type="submit">
                                Next
                            </Button>
                        </form>
                        <Button onClick={() => navigate('/home')}>Back</Button>
                    </Form>
                )}

                {nextForm === 2 && (
                    <Form {...form2}>
                        <form onSubmit={form2.handleSubmit(onSubmitForm2, onErrorForm)} className="space-y-6">
                            <div className="flex gap-5">
                                <div className="w-1/2">
                                {/* First Name  */}
                                    <FormField
                                        control={form2.control}
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
                                        control={form2.control}
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
                                        control={form2.control}
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
                                </div>
                            
                                <div className="w-1/2">
                                {/* Birth Date */}
                                    <FormField
                                        name="birth_date"
                                        control={form2.control}
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
                                        control={form2.control}
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
                                        control={form2.control}
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
                                </div>
                            </div>
                            {/* BUTTONS */}
                            <div className="float-end">
                                <Button type="submit">
                                    Next
                                </Button>    
                            </div>
                        </form>
                    </Form>
                )}

                {nextForm === 3 && (
                    <Form {...form3}>
                        <form onSubmit={form3.handleSubmit(onSubmitForm3, onErrorForm)} className="space-y-6">
                        {/* For Students */}
                            {role === 'student' && (
                                <RegisterStudent form={form3}/>
                            )}
                        {/* For Faculty */}
                            {role === 'faculty' && (
                                <RegisterTeacher form={form3}/>
                            )}
                        {/* SUBMIT */}
                            <div className="float-end">
                                <Button type="submit">
                                    Register
                                </Button>    
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    )
}
