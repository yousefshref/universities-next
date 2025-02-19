'use client'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MostSearchableMajors = () => {
    return (
        <div id='majors' className='md:mt-24 mt-48 w-full'>
            <h3 className='text-3xl text-[#2C2C2C] mb-4 font-bold'>اكثر التخصصات بحثا</h3>
            <Swiper
                spaceBetween={50}
                slidesPerView={'auto'}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide key={index} className='w-full max-w-[260px]'>
                        <div className='flex flex-col gap-1 w-full'>
                            <img src="/images/major.png" alt="major" className='w-full' loading='lazy' />
                            <div className='flex items-center justify-between mt-1'>
                                <p className='font-bold text-[#2C2C2C]'>قانون</p>
                                <div className='flex items-center text-base gap-1'>
                                    <i className="fi fi-rs-star"></i>
                                    <i className="fi fi-rs-star"></i>
                                    <i className="fi fi-rs-star"></i>
                                    <i className="fi fi-rs-star"></i>
                                    <i className="fi fi-rs-star"></i>
                                </div>
                            </div>
                            <div className='flex items-center mt-1 gap-5 justify-between'>
                                <p className='text-[#717171]'>390 رأي طالب</p>
                                <button className='text-sm btn-black'>
                                    تفــاصيل
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MostSearchableMajors
