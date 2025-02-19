import React from 'react'

const SpecificMajors = () => {
    return (
        <div className='mt-20 w-full'>
            <h3 className='text-3xl font-bold text-center'>هل تريد تخصص معين؟</h3>
            <div className='flex flex-wrap w-full mt-5 text-center items-center justify-center'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className='flex gap-3 p-4 items-center md:w-1/2 md:justify-center justify-start w-full' key={index}>
                        <img src="/images/specific-major.png" alt="" className='w-[100px]' />
                        <p className='font-bold'>حاسبات ومعلومات</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpecificMajors
