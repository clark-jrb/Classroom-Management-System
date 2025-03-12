import { StudentLayout } from "../StudentLayout"
import { Container } from "@/components/Container"
import { Suspense } from "react"
import { GradesTable } from "./GradesTable"
import { LoaderCircle } from "lucide-react"

export const MyGrades = () => {


    return (
        <StudentLayout>
            <Container>
                <div className="h-full flex flex-col gap-6">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        My Grades
                    </div>
                    <Suspense fallback={
                        <div className="flex-1 flex justify-center items-center">
                            <LoaderCircle className="animate-spin text-red" color="gray" size={'3rem'}/>
                        </div>
                    }>
                        <GradesTable/>
                    </Suspense>
                </div>
            </Container>
        </StudentLayout>
    )
}
