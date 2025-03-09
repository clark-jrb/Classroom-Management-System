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
import { 
    userAccountSchema, 
    userClassesSchema, 
    userProfileSchema 
} from "@/schemas/user.schema"
import { z } from "zod"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useAuthQuery } from "@/hooks/useAuthQuery"
import { useAuthStore } from "@/stores/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { DatePicker } from "@/components/ui/date-picker"
import { RegisterStudent } from "./student"
import { RegisterTeacher } from "./teacher"
import { unregisterFields } from "@/helpers/unregister-fields"
import { AuthContainer } from "@/components/AuthContainer"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const Register = () => {
    const navigate = useNavigate()
    const { role } = useAuthStore()
    const { registerUser }  = useAuthQuery()
    const [formStep, setFormStep] = useState(1)
    const [form1Values, setform1Values] = useState({})
    const [form2Values, setform2Values] = useState({})

    useEffect(() => {
        if (!role) {
            console.log('role is empty')
            navigate('/home')
        } else {
            unregisterFields({ form: form3, role })
        }
    }, [role]);

    const form1 = useForm<z.infer<typeof userAccountSchema>>({
        resolver: zodResolver(userAccountSchema),
        defaultValues: {
            email: "",
            password: "",
            role: role,
        },
        mode: "onBlur"
    })

    const form2 = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            sex: "",
            contact: "",
        },
        mode: "onBlur"
    })

    const form3 = useForm<z.infer<typeof userClassesSchema>>({
        resolver: zodResolver(userClassesSchema),
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

    function onSubmitForm1(values: z.infer<typeof userAccountSchema>) {
        if (role !== 'admin') {
            setform1Values(values)
            setFormStep(2)
        } else {
            const adminData = {
                account: values
            }
            registerUser.mutate(adminData)
            console.log(values)
        }
    }

    function onSubmitForm2(values: z.infer<typeof userProfileSchema>) {
        setform2Values(values)
        setFormStep(3)
    }

    function onSubmitForm3(values: z.infer<typeof userClassesSchema>) {
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
            <AuthContainer>
                <div className="text-2xl">Register an account</div>
                {formStep === 1 && (
                    <Form {...form1}>
                        <form onSubmit={form1.handleSubmit(onSubmitForm1, onErrorForm)} className="space-y-6">
                            <FormField
                                control={form1.control}
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
                                            />
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
                                            <Input 
                                                className="py-6"
                                                type="password" 
                                                placeholder="your password" 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button 
                                className="w-full py-6"
                                variant={'outline'}
                                type="submit"
                            >
                                {role !== 'admin' ? <>Next<ArrowRight/></> : 'Register'}
                            </Button>
                        </form>
                        <div className="border-b"></div>
                        <div>
                            <Button 
                                variant={'outline'}
                                onClick={() => navigate('/home')}
                            >
                                <ArrowLeft/>Go Back
                            </Button>
                        </div>
                    </Form>
                )}

                {formStep === 2 && (
                    <Form {...form2}>
                        <form onSubmit={form2.handleSubmit(onSubmitForm2, onErrorForm)} className="space-y-6">
                            <div className="w-[40rem] flex gap-6">
                                <div className="w-1/2 space-y-6">
                                {/* First Name  */}
                                    <FormField
                                        control={form2.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name:</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        className="py-6"
                                                        placeholder="your first name" 
                                                        {...field} 
                                                        disabled={registerUser.isPending}
                                                    />
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
                                                    <Input 
                                                        className="py-6"
                                                        placeholder="your middle name" 
                                                        {...field} 
                                                        disabled={registerUser.isPending}
                                                    />
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
                                                    <Input 
                                                        className="py-6"
                                                        placeholder="your last name" 
                                                        {...field} 
                                                        disabled={registerUser.isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            
                                <div className="w-1/2 space-y-6">
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
                                                    <Select 
                                                        onValueChange={field.onChange} 
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="py-6">
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
                                                    <Input 
                                                        className="py-6"
                                                        placeholder="your contact number" 
                                                        {...field} 
                                                        disabled={registerUser.isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* BUTTONS */}
                            <div className="float-end">
                                <Button 
                                    variant={'outline'}
                                    type="submit"
                                >
                                    Next<ArrowRight/>
                                </Button>    
                            </div>
                            <div className="float-start">
                                <Button 
                                    type="button"
                                    variant={'outline'}
                                    onClick={() => {
                                        setFormStep(1)
                                        // form1.reset()
                                    }}
                                >
                                    <ArrowLeft/>Back
                                </Button>    
                            </div>
                        </form>
                    </Form>
                )}

                {formStep === 3 && (
                    <Form {...form3}>
                        <form onSubmit={form3.handleSubmit(onSubmitForm3, onErrorForm)} className="space-y-6">
                            {/* Form for Students */}
                            {role === 'student' && (
                                <RegisterStudent form={form3}/>
                            )}
                            {/* Form for Faculty */}
                            {role === 'faculty' && (
                                <RegisterTeacher form={form3}/>
                            )}
                            <div className="float-start">
                                <Button 
                                    type="button"
                                    variant={'outline'}
                                    onClick={() => {
                                        setFormStep(2)
                                        // form1.reset()
                                    }}
                                >
                                    <ArrowLeft/>Back
                                </Button>    
                            </div>
                            {/* Submit */}
                            <div className="float-end">
                                <Button type="submit">
                                    Register
                                </Button>    
                            </div>
                        </form>
                    </Form>
                )}
            </AuthContainer>
        </div>
    )
}
