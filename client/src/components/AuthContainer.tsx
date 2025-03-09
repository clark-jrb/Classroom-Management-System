

export const AuthContainer = ({ children }: any) => {
    return (
        <div className="w-auto min-w-[20rem] h-auto border rounded-md p-6 bg-white shadow-sm flex flex-col gap-6">
            {children}
        </div>
    )
}
