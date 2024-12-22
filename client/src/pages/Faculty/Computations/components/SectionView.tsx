import { useParams } from "react-router-dom"

export const SectionView = () => {
    const { section, subject } = useParams()

    return (
        <div className="space-y-4">
            {section}
            {subject}
        </div>
    )
}
