'use client'
import React from 'react'
import { UniverstyContextProvider } from '@/contexts/UniverstyContext'
import { useRouter } from 'next/navigation'

const UniverstiesContainer = () => {
    const { universities, loading, error } = React.useContext(UniverstyContextProvider)

    const router = useRouter();

    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className='mt-10 flex flex-col gap-10'>
            {universities.map((countryGroup, countryIndex) => (
                <div key={countryIndex} className='flex flex-col'>
                    {/* Country Name */}
                    <p className='text-xl text-[#494949] font-bold'>{countryGroup.country}</p>
                    {/* Loop through cities */}
                    {countryGroup.universities.map((cityGroup, cityIndex) => (
                        <div key={cityIndex} className='mt-4'>
                            <p className='text-[#7E7E7E] mt-1'>{cityGroup.city}</p>
                            {/* Cards for each university in the city */}
                            <div className='flex flex-col mt-4 gap-4 w-full'>
                                {cityGroup.results.map((uni) => (
                                    <div
                                        key={uni.id}
                                        className='p-4 bg-[#EEEEEE] w-full grid md:grid-cols-3 grid-cols-1 items-center rounded-xl gap-10'
                                    >
                                        {/* Right section: Image and details */}
                                        <div className='flex sm:flex-row flex-col sm:items-center items-start gap-4 md:col-span-2 col-span-3'>
                                            <img src={uni?.image} alt="universty image" />
                                            <div className='flex flex-col gap-3 w-full'>
                                                <div className='flex lg:flex-row flex-col lg:items-center items-start justify-between'>
                                                    <p className='text-xl font-bold text-[#2F2F2F]'>{uni.university_name}</p>
                                                    <div className='flex items-center gap-2'>
                                                        {Array.from({ length: Number(uni?.rating) }).map((_, index) => (
                                                            <i key={index} className="fi fi-rs-star"></i>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className='text-sm text-[#828282]'>
                                                    {uni.description?.length > 150 ? `${uni.description?.slice(0, 150)}...` : uni.description}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Left section: Stats and button */}
                                        <div className='flex flex-col gap-5 md:col-span-1 col-span-3'>
                                            <div className='flex lg:flex-row md:flex-col flex-row lg:gap-0 gap-5 items-center justify-start w-full'>
                                                <div className='flex items-end gap-1 w-full'>
                                                    <p className='text-2xl text-[#2D2D2D] font-bold'>{uni.collages_number}</p>
                                                    <p className='text-sm text-[#2D2D2D]'>تخصص</p>
                                                </div>
                                                <div className='flex items-end gap-1 w-full'>
                                                    <p className='text-2xl text-[#2D2D2D] font-bold'>{uni?.reviews_numbers}</p>
                                                    <p className='text-sm text-[#2D2D2D]'>رأي طالب</p>
                                                </div>
                                            </div>
                                            <button onClick={() => router.push(`/search/${uni.university_name?.replace(/\s+/g, '-').toLowerCase()}/${uni.id}/`)} className='btn-black'>تفاصيل</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            {loading && <div className='text-center py-4'>Loading...</div>}
        </div>
    )
}

export default UniverstiesContainer
