import { useStudentGPAs } from "@/hooks/useStudentQueries"
import { useAuthStore } from "@/stores/auth/authSlice"

export const GradesTable = () => {
    const { user_id } = useAuthStore()
    const { data } = useStudentGPAs(user_id)

    return (
        <div>
            <div>Grades</div>
            <div className="flex">
                <div className="flex-col w-[250px]">
                    <div className="border-b p-3">Learning Areas</div>
                    <div className="border-b p-3">Math</div>
                    <div className="border-b p-3">Science</div>
                    <div className="border-b p-3">English</div>
                    <div className="border-b p-3">Mapeh</div>
                    <div className="border-b p-3">Filipino</div>
                    <div className="border-b p-3">Hekasi</div>
                </div>
                {data.map((data) => (
                    <div className="flex-col" key={data._id}>
                        <div className="border-b border-l p-3">{data.quarter}</div>
                        <div className="border-b border-l p-3">{data.math}</div>
                        <div className="border-b border-l p-3">{data.science}</div>
                        <div className="border-b border-l p-3">{data.english}</div>
                        <div className="border-b border-l p-3">{data.mapeh}</div>
                        <div className="border-b border-l p-3">{data.filipino}</div>
                        <div className="border-b border-l p-3">{data.hekasi}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
