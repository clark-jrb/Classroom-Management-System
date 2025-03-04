import { FacultyLayout } from "./FacultyLayout"
import { Container } from "@/components/Container"
import { getQuarterName } from "@/helpers/get-quarter"
import { useCurrentQuarterStore } from "@/stores/globalSlice"

export const FacultyDashboard = () => {
    const { current_quarter } = useCurrentQuarterStore()

    return (
        <FacultyLayout>
            <Container>
                <div>
                    Faculty Dashboard
                    <div className="h-[10rem] w-[10rem] border rounded">
                        <p className="text-lg">Current:</p>
                        <p className="text-2xl">
                            {current_quarter && 
                                getQuarterName(current_quarter)
                            }
                        </p>
                    </div>
                </div>
            </Container>
        </FacultyLayout>
    )
}
