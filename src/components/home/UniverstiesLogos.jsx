'use client'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const UniverstiesLogos = () => {
    return (
        <div className='w-full mt-6'>
            <Swiper
                spaceBetween={50}
                slidesPerView={'auto'}
                className='w-full'
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide key={index} className="w-full max-w-fit">
                        <img src="/images/universty-logo.png" alt="universty logo" className='md:w-[150px] w-[100px]' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default UniverstiesLogos
