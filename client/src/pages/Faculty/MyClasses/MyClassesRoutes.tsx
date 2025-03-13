import { Container } from "@/components/Container"
import { FacultyLayout } from "../FacultyLayout"
import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { MyClasses } from "./MyClasses"
import { LoaderCircle } from "lucide-react"


export const MyClassesRoutes = () => {
    return (
        <FacultyLayout>
            <Container>
                <div className="space-y-4 flex flex-col h-full">
                    <div className="text-xl text-navy pb-4 border-b border-light_navy leading-none">
                        My Class
                    </div>
                    <Routes>
                        <Route path="/" element={
                            <Suspense fallback={
                                <div className="flex-1 flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" color="gray" size={'3rem'}/>
                                </div>
                            }>
                                <MyClasses/>
                            </Suspense>
                        }/>
                    </Routes>
                </div>
            </Container>
        </FacultyLayout>
    )
}
