import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { useProfileMutation } from "@/hooks/useUsersQuery"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getChangedFields } from "@/helpers/changed-fields"
import { useEffect } from "react"
import { useToastStore } from "@/stores/toastStore"
import { toast } from "sonner"
import { StudentInformation } from "@/types/student.types"
import { TeacherInformation } from "@/types/teacher.types"
import { userProfileSchema } from "@/schemas/user.schema"
import { LoaderCircle } from "lucide-react"

export const ProfileForm = ({ user_data }: {
    user_data: StudentInformation | TeacherInformation
}) => {
    const { updateProfile } = useProfileMutation() // from custom hook
    const { profile } = user_data // destructure user_data but only get the profile data
    const convertedData = {...profile, birth_date: new Date(profile.birth_date)} // because the birth_date is string from the document
    const { message, type, clearToast } = useToastStore()
    
    // profile information form
    const profile_form = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema)
    })

    function onSubmit(values: z.infer<typeof userProfileSchema>) {
        const getChanges = getChangedFields(convertedData, values)

        if (Object.keys(getChanges).length !== 0) {
            updateProfile.mutateAsync(getChanges)
        } else {
            toast.warning('There is nothing to update')
        }
    }

    function onError(errors: any) { console.log("Form errors:", errors) }

    // fill the dialog form with data
    useEffect(() => {
        if (user_data) {
            profile_form.reset(convertedData)
        }
    }, [user_data, profile_form])

    
    useEffect(() => {
        if (message) {
            toast[type || 'info'](message)
            clearToast()
        }
    }, [message, type, clearToast])

    return (
        <DialogContent className="sm:max-w-[625px]">
            <Form {...profile_form}>
                <form onSubmit={profile_form.handleSubmit(onSubmit, onError)} className="space-y-4">
                    {/* header  */}
                    <DialogHeader className="space-y-3">
                        <DialogTitle className="font-medium">
                            <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                                Edit Profile
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to your profile. Click "Save changes" when you're done.
                        </DialogDescription>
                    </DialogHeader>
                        {/* body  */}
                        <div className="flex gap-6">
                            <div className="grid gap-4 py-4 w-1/2">
                                {/* First Name */}
                                <FormField
                                    control={profile_form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">First Name:</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="py-6"
                                                    placeholder="Your first name" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Middle Name */}
                                <FormField
                                    control={profile_form.control}
                                    name="middlename"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">Middle Name:</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="py-6"
                                                    placeholder="Your middle name" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Last Name */}
                                <FormField
                                    control={profile_form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">Last Name:</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="py-6"
                                                    placeholder="Your last name" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4 py-4 w-1/2">
                                {/* Contact */}
                                <FormField
                                    control={profile_form.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">Contact:</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="py-6"
                                                    placeholder="your contact number" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Sex */}
                                <FormField
                                    control={profile_form.control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">Sex:</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                {/* Birth Date */}
                                <FormField
                                    name="birth_date"
                                    control={profile_form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">Birth Date:</FormLabel>
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
                        </div>
                        {/* footer  */}
                    <DialogFooter>
                        <Button 
                            variant={"navy"}
                            type="submit" 
                            disabled={updateProfile.isPending}
                        >
                            {updateProfile.isPending 
                                ? <LoaderCircle className="animate-spin" color="white"/> 
                                : "Save changes"
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
