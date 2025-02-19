'use client'
import Navbar from '@/components/home/Navbar';
import { UniverstyContextProvider } from '@/contexts/UniverstyContext';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Footer from '@/components/home/Footer';
import axios from 'axios';
import { server } from '@/app/server';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { message } from 'antd';

const page = () => {
    const { universty, loading, colleges } = useContext(UniverstyContextProvider);
    const { user } = useContext(AuthContextProvider)

    const [collageDetails, setCollageDetails] = useState(null);


    const [reviews, setReviews] = useState([]);

    const getReviews = async () => {
        try {
            const response = await axios.get(`${server}/api/reviews/?collage=${collageDetails?.id}`)
            setReviews(response.data)
        } catch (error) {
            console.error(`Error fetching reviews:`, error)
        }
    }

    useEffect(() => {
        if (collageDetails?.id) {
            getReviews()
        }
    }, [collageDetails?.id])



    const [messageAapi, contextHolder] = message.useMessage();

    const [text, setText] = useState('');
    const [rating, setRating] = useState("5");

    const createReview = async () => {
        try {
            const response = await axios.post(`${server}/api/reviews/`, {
                user: user?.id ? user?.id : '',
                collage: collageDetails?.id ? collageDetails?.id : '',
                text: text,
                rating: rating
            })
            setReviews([response.data, ...reviews])
            messageAapi.open({
                type: 'success',
                content: 'تم انشاء التقييم بنجاح',
            })
            setText('')
        } catch (error) {
            console.error(`Error creating review:`, error)
            messageAapi.open({
                type: 'error',
                content: 'حدث خطأ اثناء انشاء التقييم',
            })
        }
    }

    return (
        <div className='md:p-5 p-3 space-y-20'>
            {contextHolder}


            <Navbar />

            {/*  */}
            <div className='w-full max-w-[1300px] mx-auto'>
                <div className="flex w-full items-center flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    <div className="md:min-w-[500px] md:w-[500px] w-full">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                            {universty?.image ? (
                                <Image src={universty?.image} alt="University building" fill priority />
                            ) : null}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6 w-full items-center">
                        {/* Header */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{universty?.university_name}</span>
                                <div className="flex gap-1">
                                    {universty?.rating ? (
                                        Array.from({ length: Number(universty?.rating) })?.map((_, i) => (
                                            <span key={i} className="text-yellow-400">
                                                ★
                                            </span>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                            <p className="text-lg">{universty?.country_name} - {universty?.city_name}</p>
                            <p className="text-gray-600">{universty?.address}</p>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-600">
                            {
                                universty?.specific_location ?
                                    <iframe src={universty?.specific_location} width="100%" height="100%"></iframe>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                {/* Description */}
                <p className="text-gray-600 leading-relaxed mt-5">
                    {universty?.description?.split('\n')?.map((line, i) => (
                        <span key={i}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>

            {/* Swiper */}
            <Swiper
                spaceBetween={window.innerWidth < 768 ? 20 : 80}
                slidesPerView={'auto'}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="w-full max-w-[1300px] mx-auto mt-10"
            >
                {colleges?.map((collage, i) => (
                    <SwiperSlide key={i} className='w-full md:max-w-[320px] max-w-[300px]'>
                        <div className="w-full flex flex-col gap-3 items-center">
                            {collage?.image ? (
                                <img src={collage?.image} loading='lazy' className='w-full' alt="" />
                            ) : null}
                            <div className='flex items-center justify-between w-full md:flex-wrap flex-col'>
                                <p className='text-lg font-bold'>{collage?.collage_name}</p>
                                <p className='text-gray-500'>+{collage?.students_count} طالب</p>
                            </div>
                            <button onClick={() => {
                                setCollageDetails(collage)
                                window.scrollTo({
                                    top: document.getElementById('details').offsetTop - 100,
                                    behavior: 'smooth'
                                })
                            }} className='p-2 w-full py-4 bg-blue-500 rounded-xl text-white'>
                                تفاصيل
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* college details */}
            <div id='details' className="max-w-[1300px] mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">تفاصيل الكلية</h1>
                    {!collageDetails?.id ? (
                        <p className="text-gray-600">
                            انقر على تفاصيل الكليه التي تريد رؤيه اراء الطلاب فيها او حتى الوصف وبعض المعلومات
                        </p>
                    ) : null}
                </div>

                {collageDetails?.id ? (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image Section */}
                        <div className="md:w-1/3">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                                {collageDetails?.image ? (
                                    <Image src={collageDetails?.image} alt="Faculty building" fill className="object-cover" priority />
                                ) : null}
                            </div>
                        </div>
                        <div className="flex-1">
                            {/* Faculty Info */}
                            <div className="space-y-3 mb-6">
                                <h2 className="text-2xl font-bold">{collageDetails?.collage_name}</h2>
                                <div className="space-y-1">
                                    <p className="text-gray-700">{collageDetails?.major_name}</p>
                                    <p className="text-blue-600">+ {collageDetails?.students_count} طالب</p>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="mb-8">
                                <p className="flex flex-wrap gap-2 text-gray-600">
                                    {collageDetails?.address}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {collageDetails?.description?.split('\n')?.map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ) : null}
            </div>



            {/* Rating Section */}
            {
                !collageDetails?.id ? (
                    null
                ) : (
                    <>
                        <div className="flex flex-col space-y-4 w-full max-w-[800px]">
                            <div className='flex w-full md:flex-row flex-col gap-6 items-start'>
                                <select onChange={(e) => setRating(e.target.value)} value={rating} className="bg-gray-100 p-3 w-full rounded-xl md:max-w-[200px]">
                                    <option value="5">5 نجوم</option>
                                    <option value="4">4 نجوم</option>
                                    <option value="3">3 نجوم</option>
                                    <option value="2">2 نجوم</option>
                                    <option value="1">1 نجوم</option>
                                </select>
                                <textarea onChange={(e) => setText(e.target.value)} value={text} className="bg-gray-100 p-3 w-full rounded-xl" placeholder="أضف تعليقا" rows={4}></textarea>
                            </div>
                            <button onClick={createReview} className="bg-blue-500 text-white p-3 w-full rounded-xl">ارسال</button>
                        </div>

                        {/* reviews */}
                        <div className='w-full max-w-[1300px] mx-auto flex items-start justify-between gap-10'>
                            {/* right */}
                            <div className='flex flex-col gap-5 w-full max-w-[900px] space-y-10'>
                                {
                                    reviews?.length === 0 ? (
                                        <p className='text-gray-500'>لا يوجد تعليقات</p>
                                    ) :
                                        reviews?.map((review, i) => (
                                            <div key={i} className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-3'>
                                                    <img src="https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg" loading='lazy' className='rounded-full w-[70px] h-[70px]' alt="" />
                                                    <div className='flex flex-col gap-0.5'>
                                                        <p className='font-bold'>{review?.user_name ? review?.user_name : "مستخدم مجهول"}</p>
                                                        <div>
                                                            {Array.from({ length: review?.rating }).map((_, i) => (
                                                                <span key={i} className='text-yellow-400'>★</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-3'>
                                                    <p className='text-gray-500'>
                                                        {review?.text?.split('\n')?.map((line, i) => (
                                                            <span key={i}>
                                                                {line}
                                                                <br />
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                            {/* left */}
                        </div>
                    </>
                )
            }


            {/* footer */}
            <Footer />
        </div >
    )
}

export default page
