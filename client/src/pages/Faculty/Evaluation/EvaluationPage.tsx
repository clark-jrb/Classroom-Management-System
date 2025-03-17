import { Container } from "@/components/Container"
import { FacultyLayout } from "../FacultyLayout"
import { EvaluationRoutes } from "./EvaluationRoutes"
import { Suspense } from "react"
import { LoaderCircle } from "lucide-react"

export const EvaluationPage = () => {
    return (
        <FacultyLayout>
            <Container>
                <div className="space-y-4 flex flex-col h-full">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        Evaluation
                    </div>
                    <Suspense fallback={
                        <div className="flex-1 flex justify-center items-center">
                            <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                        </div>
                    }>
                        <EvaluationRoutes/>
                    </Suspense>
                </div>
            </Container>
        </FacultyLayout>
    )
}
