import OOK_logo from '@/assets/ook_logo.png'

export const HomePageWrapper = ({ children }: any) => {
    return (
        <div className="bg-white rounded-md w-[25rem]">
            <div className='pt-6 px-8 pb-2 text-navy text-start w-full'>
                Welcome to
            </div>
            <div className="px-8 flex gap-2 justify-center items-end ">
                <div>
                    <img src={OOK_logo} alt="ook_logo" className='w-[5rem] h-[5rem]'/>
                </div>
                <div className='text-2xl text-navy font-semibold'>
                    <div className='leading-none'>
                        Oceans <br /> 
                        Of Knowledge 
                    </div>
                    <div className='text-base font-medium'>
                        Classroom Management System
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
