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
import { useAuthentication } from "@/hooks/useAuthentication"
import { registerAccountSchema, registerInformationSchema } from "@/schemas/authSchemas"
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
// import { handleNextForm } from "@/helpers/unregister-fields"

export const Register = () => {
    const { registerUser }  = useAuthentication()
    const navigate = useNavigate()
    const { role } = useAuthStore()
    const [nextForm, setNextForm] = useState(1)
    const [form1Values, setform1Values] = useState({})

    useEffect(() => {
        if (!role) {
            console.log('role is empty')
            navigate('/home')
        }
        if (role === 'student') {
            form2.unregister('subjects')
            form2.unregister('teacher_role')
            form2.unregister('grade_assigned')
            form2.unregister('section_handled')
        }
        if (role === 'faculty') {
            form2.unregister('gradeLevel')
            form2.unregister('section')
        }
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
        // registerUser.mutate(values)
        // form.reset()
        console.log(values)
        setform1Values(values)
        setNextForm(2)
    }

    function onSubmitForm2(values: z.infer<typeof registerInformationSchema>) {
        // registerUser.mutate(values)
        const registerData = {
            accountData: form1Values,
            informationData: values
        }
        console.log(registerData)
    }

    function onErrorForm1(errors: any) { console.log("Form errors:", errors) }
    function onErrorForm2(errors: any) { console.log("Form errors:", errors) }

    return (
        <div className="register-page">
            <div className="border rounded-md p-6">
                {nextForm === 1 && (
                    <Form {...form1}>
                        <form onSubmit={form1.handleSubmit(onSubmitForm1, onErrorForm1)} className="space-y-6">
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
                        <form onSubmit={form2.handleSubmit(onSubmitForm2, onErrorForm2)} className="space-y-6">
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
                                </div>
                            
                                <div className="w-1/2">
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
                                {/* For Students */}
                                    {role === 'student' && (
                                        <RegisterStudent form={form2}/>
                                    )}
                                {/* For Faculty */}
                                    {role === 'faculty' && (
                                        <RegisterTeacher form={form2}/>
                                    )}
                                </div>
                            </div>
                            {/* BUTTONS */}
                            <div className="float-end">
                                <Button type="submit">
                                    {/* {registerUser.isPending ? 'Processing...' : 'Register'} */}
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
