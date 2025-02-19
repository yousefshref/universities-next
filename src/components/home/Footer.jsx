import React from 'react'

const Footer = () => {
    return (
        <div className='mt-10 bg-[#E5E5E5] text-[#2C2C2C] flex flex-col gap-5 p-5 rounded-xl'>
            <div className='flex items-center gap-5 justify-between'>
                <p className='text-xl font-bold'>لوجو</p>
                <p>نساعدك في بناء مستقبل قوي</p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1 flex flex-col gap-3 md:items-center justify-start'>
                    <p className='font-bold'>تابعنا على</p>
                    <div className='flex flex-col'>
                        <i className="fi fi-brands-instagram"></i>
                        <i className="fi fi-brands-instagram"></i>
                        <i className="fi fi-brands-instagram"></i>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-3 md:items-center justify-start'>
                    <p className='font-bold'>روابط سريعة</p>
                    <div className='flex flex-col'>
                        <p>الرئيسية</p>
                        <p>من نحن</p>
                        <p>من التخصصات</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
