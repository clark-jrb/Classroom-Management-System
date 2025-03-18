

export const ColoredRow = ({ grade }: { 
    grade: number 
}) => {
    return (
        <>
            <div className="relative z-40">
                {grade 
                    ? grade.toFixed(0) 
                    : ''
                }
            </div>
            <div 
                className={`absolute bottom-0 left-0 z-0 w-full h-full 
                    ${!grade 
                        ? ''
                        : grade && grade >= 85
                            ? 'passed'
                            : 'failed'
                    }
                `}
            ></div>
        </>
    )
}
