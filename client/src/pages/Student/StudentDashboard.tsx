import { useCurrentQuarterStore } from "@/stores/globalSlice"
import { StudentLayout } from "./StudentLayout"
import { Container } from "@/components/Container"
import { getQuarterName } from "@/helpers/get-quarter"

export const StudentDashboard = () => {
    const { current_quarter } = useCurrentQuarterStore()

    return (
        <StudentLayout>
            <Container>
                <div>
                    Student Dashboard
                    <div className="h-[10rem] w-[10rem] border rounded">
                        <p className="text-lg">Current:</p>
                        <p className="text-2xl">
                            {current_quarter 
                                ? getQuarterName(current_quarter)
                                : 'Loading...'
                            }
                        </p>
                    </div>
                </div>
            </Container>
        </StudentLayout>
    )
}
