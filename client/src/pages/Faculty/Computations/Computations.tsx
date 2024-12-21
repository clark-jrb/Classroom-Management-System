import { FacultyLayout } from "../FacultyLayout"
import { Container } from "@/components/container"
import { Procedures } from "./components/Procedures"

export const Computations = () => {
    return (
        <FacultyLayout>
            <Container>
                Computations
                <Procedures/>
            </Container>
        </FacultyLayout>
    )
}
