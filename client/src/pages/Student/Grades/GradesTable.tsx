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
                    <div className="border-b h-[5rem]">Learning Areas</div>
                    <div className="border-b p-3">Math</div>
                    <div className="border-b p-3">Science</div>
                    <div className="border-b p-3">English</div>
                    <div className="border-b p-3">Mapeh</div>
                    <div className="border-b p-3">Filipino</div>
                    <div className="border-b p-3">Hekasi</div>
                </div>
                <div>
                    <div className="border-b h-[5rem]">
                        <div className="h-[2.5rem] border-b border-l">Quarters</div>
                        <div className="flex h-[2.5rem]">
                            <div className="border-b border-l px-3">1</div>
                            <div className="border-b border-l px-3">2</div>
                            <div className="border-b border-l px-3">3</div>
                            <div className="border-b border-l px-3">4</div>
                        </div>
                    </div>
                    <div className="flex">
                        {data.map((data) => (
                            <div className="flex-col" key={data._id}>
                                {/* <div className="border-b border-l p-3">{data.quarter}</div> */}
                                <div className="border-b border-l p-3">{data.math}</div>
                                <div className="border-b border-l p-3">{data.science}</div>
                                <div className="border-b border-l p-3">{data.english}</div>
                                <div className="border-b border-l p-3">{data.mapeh}</div>
                                <div className="border-b border-l p-3">{data.filipino}</div>
                                <div className="border-b border-l p-3">{data.hekasi}</div>
                            </div>
                        ))}
                    </div>
                    <div className="border-b border-l py-3">
                        General Average
                    </div>
                </div>
                <div>
                    <div className="border-b border-l p-3 h-[5rem]">Final <br/> Grade</div>
                    <div className="border-b border-l p-3">0</div>
                    <div className="border-b border-l p-3">0</div>
                    <div className="border-b border-l p-3">0</div>
                    <div className="border-b border-l p-3">0</div>
                    <div className="border-b border-l p-3">0</div>
                    <div className="border-b border-l p-3">0</div>
                    <div className="border-b border-l p-3">0</div>
                </div>
                <div className="w-[7rem]">
                    <div className="border-b border-l p-3 h-[5rem]">Remarks</div>
                    <div className="border-b border-l p-3">N/A</div>
                    <div className="border-b border-l p-3">N/A</div>
                    <div className="border-b border-l p-3">N/A</div>
                    <div className="border-b border-l p-3">N/A</div>
                    <div className="border-b border-l p-3">N/A</div>
                    <div className="border-b border-l p-3">N/A</div>
                    <div className="border-b p-3">N/A</div>
                </div>
            </div>
        </div>
    )
}
