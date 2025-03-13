import { useCurrentQuarterStore } from "@/stores/globalSlice"
import { StudentLayout } from "./StudentLayout"
import { Container } from "@/components/Container"
import { getQuarterName } from "@/helpers/get-quarter"
import { CalendarRange, LoaderCircle } from "lucide-react"

export const StudentDashboard = () => {
    const { current_quarter } = useCurrentQuarterStore()
    return (
        <StudentLayout>
            <Container>
                <div className="space-y-6">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        Dashboard
                    </div>
                    <div className="w-[17rem] h-[5.5rem] rounded-xl border p-4 flex">
                        {current_quarter 
                            ?   <>
                                <div className="w-full">
                                    <div className="text-gray-500 text-sm">
                                        Current quarter:&nbsp;
                                    </div>
                                    <div className="text-3xl text-navy">
                                        {getQuarterName(current_quarter)}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <CalendarRange strokeWidth={1} />
                                </div>
                                </>
                            :   <div className="w-full h-full flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" color="gray"/>
                                </div>
                        }
                    </div>
                </div>
            </Container>
        </StudentLayout>
    )
}
